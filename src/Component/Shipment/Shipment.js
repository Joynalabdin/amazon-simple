import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import form from './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const onSubmit = data => {
      console.log("form submitted", data);
    }

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name"defaultValue={loggedInUser.name}ref={register({ required: true })} placeholder="Your name" />
      {errors.name && <span>This name is required</span>}

      <input name="email"defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your email" />
      {errors.email && <span>Email is required</span>}

      <input name="Address" ref={register({ required: true })} placeholder="Your Address" />
      {errors.Address && <span>Address is required</span>}

      <input name="Phone" ref={register({ required: true })} placeholder="Your Phone" />
      {errors.Phone && <span>Phone is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;