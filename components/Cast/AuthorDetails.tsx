const AuthorDetails = ({ pfpUrl, displayName }: any) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img
      src={pfpUrl}
      alt="profile"
      style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
    />
    <div>
      <div>
        <strong>{displayName}</strong>
      </div>
    </div>
  </div>
);

export default AuthorDetails;
