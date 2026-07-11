import FollowFeed from "../components/FollowFeed.jsx";
const FollowFeedPage = () => {
    return (
        <div className="follow-feed-page">
            <div className="follow-feed-header">
                <h1>Discover People</h1>
                <p>Find interesting writers to follow</p>
            </div>
            <FollowFeed />
        </div>
    );
};
export default FollowFeedPage;