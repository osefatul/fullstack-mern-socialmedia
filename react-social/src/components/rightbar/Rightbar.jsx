import React, { useState, useEffect } from "react";
import "./Rightbar.css";
import Online from "../online/Online";
import { Users } from "../../data";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  selectIsFollowing,
  selectUser,
  selectIsFetching,
  follow,
  unfollow,
  followed,
  unfollowed,
  fetchingReset,
  credentialsFetched,
} from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Add, Remove } from "@material-ui/icons";

function Rightbar({ user }) {
  //currentUser: Someone who is logged in.
  //user: someone we have their username in the params. user could be the current user or different user.
  const currentUser = useSelector(selectUser);
  const isFollowing = useSelector(selectIsFollowing);
  const isFetching = useSelector(selectIsFetching);
  const dispatch = useDispatch();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [userUpdated, setuserUpdated] = useState();

  //I am using this function because I want to get my data from the mongoDB directly in realtime. I dont want to get my data from the localStorage as it is not updated in realtime.
  const getCurrentUser = async () => {
    try {
      const currentUserupdatedData = await axios.get(
        `/users?username=${currentUser.username}`
      );
      setuserUpdated(currentUserupdatedData.data.followings);

      //check if the Id of the user profile u visited is in ur followings list.
      //if yes, then dispatch the followed reducer.
      //if not, then dispatch the unfollwed reducer.
      //I want to use the below code here because that's a good time to check user is being followed or not. we can use this one in the useEffect as well. but that will not keep the update of the follow button.
      if (userUpdated?.includes(user?._id)) {
        dispatch(followed());
      } else {
        dispatch(unfollowed());
      }
    } catch (err) {
      console.log(err);
    }
  };

  //get all the friends list you are following.
  const getFriends = async () => {
    try {
      const friendList = await axios.get("/users/friends/" + user._id);
      setFriends(friendList.data);
    } catch (err) {
      console.log(err);
    }
  };

  const followHandler = async (e) => {
    e.preventDefault();
    try {
      if (userUpdated?.includes(user?._id)) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch(unfollow(user._id));
        dispatch(unfollowed());
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch(follow(user._id));
        dispatch(followed());
      }

      //Whenever we click on the follow button there is toggling between follow and unfollow of the button label until the data is fully fetched and it is stable.
      //To avoid that I am toggling isFetching true and false again after 2.7 seconds.
      dispatch(credentialsFetched());
      await setTimeout(() => {
        dispatch(fetchingReset());
      }, 2700);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //Function for fetching friends and the user data
    getFriends();
    getCurrentUser();
    // console.log(userUpdated);
    // console.log("is it following " + isFollowing);
    // console.log("is it fetching " + isFetching);
  }, [user, isFollowing, isFetching]);

  //Component for Home page
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={`${PF}birthdayGift.png`} alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Thor</b> and <b>2 other friends</b> have a birthday.
          </span>
        </div>
        <img src={`${PF}ad.jpg`} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </ul>
      </>
    );
  };

  //Component for profile page
  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={followHandler}>
            {isFetching === false && isFollowing ? "Unfollow" : "Follow"}
            {isFetching === false && isFollowing ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  className="rightbarFollowingimg"
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "/noAvatar.webp"
                  }
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default Rightbar;
