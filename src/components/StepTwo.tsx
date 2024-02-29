export default function StepTwo({ userData }) {

  return (
    <div className="step-two">
      <h2>Confirm details</h2>
      {userData
        ? (
          <div>
            <p>{userData.name}</p>
            <p>{userData.email}</p>
            <p>{userData.country}</p>
            <p>{userData.city}</p>
          </div>
        )
        : null}
    </div>
  );
}