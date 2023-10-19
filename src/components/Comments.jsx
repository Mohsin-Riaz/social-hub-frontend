import { formatDistanceToNowStrict, parseISO } from 'date-fns'
import React from 'react'
import { useSelector } from 'react-redux'
import DeleteButton from './DeleteButton'
import PeopleCard from './PeopleCard'

const Comments = (props) => {
    const { userInfo } = useSelector((store) => store.user)
    const { postId, commentId, peopleId, commentText, dateCreated, avatar } =
        props

    return (
        <div key={commentId} className="comment">
            <PeopleCard {...props} />
            <div className="comment_content pad">
                <div className="comment_content_info">
                    <div className="comment_content_info_text">
                        {commentText}
                    </div>
                </div>
                <div className="comment_content_stats">
                    {userInfo?.peopleId === peopleId ? (
                        <div className="comment_content_stats_buttons">
                            <DeleteButton
                                commentId={commentId}
                                postId={postId}
                            />
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <div className="comment_content_stats_time">
                        {!!parseISO(dateCreated) &&
                            formatDistanceToNowStrict(parseISO(dateCreated), {
                                addSuffix: true,
                            })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comments
