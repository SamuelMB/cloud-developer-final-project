import React, { Component } from 'react'
import { Link, Route, Router, Switch } from 'react-router-dom'
import { Grid, Menu, Segment } from 'semantic-ui-react'

import Auth from './auth/Auth'
import { EditPost } from './components/EditPost'
import { LogIn } from './components/LogIn'
import { NotFound } from './components/NotFound'
import { PostsUser } from './components/PostsUser'
import { CreatePost } from './components/CreatePost'
import { AllPosts } from './components/AllPosts'

export interface AppProps {}

export interface AppProps {
  auth: Auth
  history: any
}

export interface AppState {}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin() {
    this.props.auth.login()
  }

  handleLogout() {
    this.props.auth.logout()
  }

  render() {
    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={16}>
                <Router history={this.props.history}>
                  {this.generateMenu()}

                  {this.generateCurrentPage()}
                </Router>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }

  generateMenu() {
    if (this.props.auth.isAuthenticated()) {
      return (
        <Menu>
          <Menu.Item name="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/posts/create">Create Post</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/posts">Your Posts</Link>
          </Menu.Item>

          <Menu.Menu position="right">{this.logInLogOutButton()}</Menu.Menu>
        </Menu>
      )
    } else {
      return (
        <Menu>
          <Menu.Item name="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Menu position="right">{this.logInLogOutButton()}</Menu.Menu>
        </Menu>
      )
    }
  }

  logInLogOutButton() {
    if (this.props.auth.isAuthenticated()) {
      return (
        <Menu.Item name="logout" onClick={this.handleLogout}>
          Log Out
        </Menu.Item>
      )
    } else {
      return (
        <Menu.Item name="login" onClick={this.handleLogin}>
          Log In
        </Menu.Item>
      )
    }
  }

  generateCurrentPage() {
    if (!this.props.auth.isAuthenticated()) {
      return <AllPosts />
    }

    return (
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => {
            return <AllPosts />
          }}
        />

        <Route
          path="/posts"
          exact
          render={(props) => {
            return <PostsUser auth={this.props.auth} {...props} />
          }}
        />

        <Route
          path="/posts/create"
          exact
          render={(props) => {
            return <CreatePost auth={this.props.auth} {...props} />
          }}
        />

        <Route
          path="/posts/:postId/edit"
          exact
          render={(props) => {
            return <EditPost {...props} auth={this.props.auth} />
          }}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
