import * as React from 'react'
import {
  Divider,
  Grid,
  Header,
  Image,
  Loader,
  Item,
  Button,
  Modal
} from 'semantic-ui-react'

import { getAllPosts } from '../api/posts-api'
import { Post } from '../types/Post'

interface PostsState {
  posts: Post[]
  newPostTitle: string
  newPostContent: string
  loadingPosts: boolean
}

export class AllPosts extends React.Component {
  state: PostsState = {
    posts: [],
    newPostTitle: '',
    newPostContent: '',
    loadingPosts: true
  }

  async componentDidMount() {
    try {
      const posts = await getAllPosts()
      this.setState({
        posts: posts,
        loadingPosts: false
      })
    } catch (e) {
      alert(`Failed to fetch posts: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">All Blog Posts</Header>

        {this.renderTodos()}
      </div>
    )
  }

  renderTodos() {
    if (this.state.loadingPosts) {
      return this.renderLoading()
    }

    return this.renderTodosList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Posts
        </Loader>
      </Grid.Row>
    )
  }

  renderTodosList() {
    return (
      <Item.Group>
        {this.state.posts.map((post, pos) => {
          return (
            <React.Fragment key={post.postId}>
              <Item>
                <Item.Image>
                  <Image src={post.attachmentUrl} size="small" wrapped />
                </Item.Image>
                <Item.Content>
                  <Item.Header>{post.title}</Item.Header>
                  <Item.Description>
                    {post.content.length > 200
                      ? `${post.content.substring(0, 200)}...`
                      : post.content}
                  </Item.Description>
                  <Item.Extra>
                    <Modal trigger={<Button>View</Button>}>
                      <Modal.Header>{post.title}</Modal.Header>
                      <Modal.Content image>
                        <Image src={post.attachmentUrl} size="large" wrapped />
                        <Modal.Description>
                          <p>{post.content}</p>
                        </Modal.Description>
                      </Modal.Content>
                    </Modal>
                  </Item.Extra>
                </Item.Content>
              </Item>
              <Divider />
            </React.Fragment>
          )
        })}
      </Item.Group>
    )
  }
}
