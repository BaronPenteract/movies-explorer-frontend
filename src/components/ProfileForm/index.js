import './index.css';

const ProfileForm = ({ title, name, onSubmit, children }) => {
  return (
    <form className={`profile-form`} name={name} onSubmit={onSubmit} action='/' noValidate>
      <div className='profile-form__header'>
        <h1 className='profile-form__title'>{title}</h1>
      </div>
      {children}
    </form>
  );
};

export default ProfileForm;
