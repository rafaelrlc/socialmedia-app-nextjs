const UserProfile = ({ user }) => {
  return (
    <div className="box-center">
      <img src={user?.photoURL} className="card-img-center" />
      <p>
        <i>@{user?.username || "Anonymous User"}</i>
      </p>
      <h1>{user?.displayName || "Anonymous User"}</h1>
    </div>
  );
};

export default UserProfile;
