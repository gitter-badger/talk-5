import React from 'react';
import styles from './CommentStream.css';
import {Snackbar} from 'react-mdl';
import {connect} from 'react-redux';
import {createComment, flagComment} from 'actions/comments';
import CommentList from 'components/CommentList';
import CommentBox from 'components/CommentBox';

/**
 * Renders a comment stream using a CommentList component
 * and adds a box for adding a new comment
 */

class CommentStream extends React.Component {
  constructor (props) {
    super(props);
    this.state = {snackbar: false, snackbarMsg: ''};
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickAction = this.onClickAction.bind(this);
  }

  // Fetch the comments before mounting
  componentWillMount () {
    this.props.dispatch({type: 'COMMENT_STREAM_FETCH'});
  }

  // Submit the new comment
  onSubmit (comment) {
    this.props.dispatch(createComment(comment.name, comment.body));
  }

  // The only action for now is flagging
  onClickAction (action, id) {
    if (action === 'flag') {
      this.props.dispatch(flagComment(id));
      clearTimeout(this._snackTimeout);
      this.setState({snackbar: true, snackbarMsg: 'Thank you for reporting this comment. Our moderation team has been notified and will review it shortly.'});
      this._snackTimeout = setTimeout(() => this.setState({snackbar: false}), 30000);
    }
  }

  // Render the comment box along with the CommentList
  render ({comments, users}, {snackbar, snackbarMsg}) {
    return (
      <div className={styles.container}>
        <CommentBox onSubmit={this.onSubmit} />
        <CommentList isActive hideActive
          singleView={false}
          commentIds={comments.get('ids')}
          comments={comments.get('byId')}
          users={users.get('byId')}
          onClickAction={this.onClickAction}
          actions={['flag']}
          loading={comments.loading} />
        <Snackbar active={snackbar}>{snackbarMsg}</Snackbar>
      </div>
    );
  }
}

export default connect(({comments, users}) => ({comments, users}))(CommentStream);
