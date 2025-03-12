const Welcome = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      {user ? (
        <>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user.name}!
          </h1>
          <p className="text-gray-600">Your email: {user.email}</p>
        </>
      ) : (
        <p className="text-gray-600">Loading user data...</p>
      )}
    </div>
  );
};

export default Welcome;
