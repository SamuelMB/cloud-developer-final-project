import * as React from 'react'
import { Form, Button } from 'semantic-ui-react'
import Auth from '../auth/Auth'
import {
  getUploadUrl,
  uploadFile,
  patchPost,
  getPostById
} from '../api/posts-api'
import { Post } from '../types/Post'
import { UpdatePostRequest } from '../types/UpdatePostRequest'

enum UploadState {
  NoUpload,
  FetchingPresignedUrl,
  UploadingFile
}

interface EditPostProps {
  match: {
    params: {
      postId: string
    }
  }
  auth: Auth
}

interface EditPostState {
  file: any
  uploadState: UploadState
  post: UpdatePostRequest
  oldPost: Post | null
}

export class EditPost extends React.PureComponent<
  EditPostProps,
  EditPostState
> {
  state: EditPostState = {
    file: undefined,
    uploadState: UploadState.NoUpload,
    post: {
      title: '',
      content: ''
    },
    oldPost: null
  }

  async componentDidMount() {
    const post = await getPostById(
      this.props.auth.getIdToken(),
      this.props.match.params.postId
    )

    this.setState({ oldPost: post })
    this.setState((prevState) => ({
      post: {
        ...prevState.post,
        title: post.title,
        content: post.content
      }
    }))
  }

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    this.setState({
      file: files[0]
    })
  }

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value
    if (!title) return

    this.setState((prevState) => ({
      post: {
        ...prevState.post,
        title
      }
    }))
  }

  handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = event.target.value
    if (!content) return

    const post = this.state.post
    post.content = content

    this.setState((prevState) => ({
      post: {
        ...prevState.post,
        content
      }
    }))
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      if (this.state.file) {
        this.setUploadState(UploadState.FetchingPresignedUrl)
        const uploadUrl = await getUploadUrl(
          this.props.auth.getIdToken(),
          this.props.match.params.postId
        )

        this.setUploadState(UploadState.UploadingFile)
        await uploadFile(uploadUrl, this.state.file)
      }

      if (this.state.oldPost) {
        if (
          this.state.post.title !== this.state.oldPost.title ||
          this.state.post.content !== this.state.oldPost.content
        ) {
          await patchPost(
            this.props.auth.getIdToken(),
            this.state.oldPost.postId,
            this.state.post
          )
        }
      }

      await alert('Post was updated!')
    } catch (e) {
      alert('Post not updated: ' + e.message)
    } finally {
      this.setUploadState(UploadState.NoUpload)
    }
  }

  setUploadState(uploadState: UploadState) {
    this.setState({
      uploadState
    })
  }

  render() {
    return (
      <div>
        <h1>Upload new image</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>File</label>
            <input
              type="file"
              accept="image/*"
              placeholder="Image to upload"
              onChange={this.handleFileChange}
            />
          </Form.Field>
          <Form.Field>
            <label>File</label>
            <input
              type="text"
              placeholder="Title"
              value={this.state.post.title}
              onChange={this.handleTitleChange}
            />
          </Form.Field>
          <Form.Field>
            <textarea
              value={this.state.post.content}
              cols={30}
              rows={10}
              onChange={this.handleContentChange}
            />
          </Form.Field>
          {this.renderButton()}
        </Form>
      </div>
    )
  }

  renderButton() {
    return (
      <div>
        {this.state.uploadState === UploadState.FetchingPresignedUrl && (
          <p>Uploading image metadata</p>
        )}
        {this.state.uploadState === UploadState.UploadingFile && (
          <p>Uploading file</p>
        )}
        <Button
          loading={this.state.uploadState !== UploadState.NoUpload}
          type="submit"
        >
          Submit
        </Button>
      </div>
    )
  }
}
