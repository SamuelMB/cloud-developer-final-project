import * as React from 'react'
import Auth from '../auth/Auth'
import { History } from 'history'
import { Button, Form } from 'semantic-ui-react'
import { createPost } from '../api/posts-api'
import { CreatePostRequest } from '../../../backend/src/requests/CreatePostRequest'

interface PostsProps {
  auth: Auth
  history: History
}

interface PostsState {
  title: string
  content: string
}

export class CreatePost extends React.PureComponent<PostsProps, PostsState> {
  state: PostsState = {
    title: '',
    content: ''
  }

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value
    if (!title) return

    this.setState({ title })
  }

  handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = event.target.value
    if (!content) return

    this.setState({ content })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      if (this.state.title && this.state.content) {
        const newPost: CreatePostRequest = {
          title: this.state.title,
          content: this.state.content
        }
        await createPost(this.props.auth.idToken, newPost)

        alert('New Post Created')
      } else {
        alert('Fill all inputs to create a new Post')
      }
    } catch (error) {
      alert('Error creating Post')
    }
  }

  render(): React.ReactNode {
    return (
      <div>
        <h1>Upload new image</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>File</label>
            <input
              type="text"
              placeholder="Title"
              onChange={this.handleTitleChange}
            />
            <textarea cols={30} rows={10} onChange={this.handleContentChange} />
            <Button type="submit">Send</Button>
          </Form.Field>
        </Form>
      </div>
    )
  }
}
