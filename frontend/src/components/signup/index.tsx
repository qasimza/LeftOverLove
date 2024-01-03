import { useAuth0 } from "@rturnq/solid-auth0";
import { Button, Checkbox } from "@suid/material";
import { createFormControl, createFormGroup } from "solid-forms";
import { Show, createSignal } from "solid-js";
import { PostUser } from "../../services/user";
import { TextInput, validators } from "./validation";

const Signup = () => {
  const group = createFormGroup({
    firstName: createFormControl("First Name", {
      required: true,
      validators: validators.required,
    }),
    lastName: createFormControl("Last Name", {
      required: true,
      validators: validators.required,
    }),
    email: createFormControl("Email", {
      required: true,
      validators: [
        validators.required,
        validators.email,
        validators.emailExists,
      ],
    }),
    reEnterEmail: createFormControl("Reenter Email", {
      required: true,
      validators: [validators.required, validators.email],
    }),
    organizationName: createFormControl("Organization Name"),
    streetAddress: createFormControl("Street Address"), 
    city: createFormControl("City"),
    state: createFormControl("State"),
    zip: createFormControl("Zip"), 
    websiteURL: createFormControl("Website URL"),
    descriptionOfItems: createFormControl("Description of Items"),
  });

  const [supplier, setSupplier] = createSignal(false);

  const auth = useAuth0();
  const onSubmit = async () => {
    if (group.isSubmitted || !group.isValid) return;
    console.log(group.value);
    const auth0user = await auth?.auth0Client()?.getUser();
    const user = {
      _id: auth0user,
      name: group.controls.firstName.value +" "+ group.controls.lastName.value,
      email: group.controls.email.value,
      phone: "",
      profileB64:"",
      // reEnterEmail: group.controls.reEnterEmail.value,
      organizationName: supplier() ? group.controls.organizationName.value || '' : undefined,
      streetaddress: supplier() ? group.controls.streetAddress.value || '' : undefined,
      city: supplier() ? group.controls.city.value || '' : undefined,
      state: supplier() ? group.controls.state.value || '' : undefined,
      zip: supplier() ? group.controls.zip.value || '' : undefined,
      websiteURL: supplier() ? group.controls.websiteURL.value || '' : undefined,
      description: supplier() ? group.controls.descriptionOfItems.value || '' : undefined,
    };
    
    try {
      // Call the PostUser function to submit the user data to the database
      const result = await PostUser(user);

      if (result === true) {
        // The user was successfully added to the database
        // Now you can proceed with other steps like submitting to auth0 and navigating to the home page
        // ...

        // For example, you can navigate to the home page using window.location.href
        window.location.href = '/home';
      } else {
        // Handle the error case here
        console.error("Error occurred while posting user data:", result);
        // You can display an error message to the user or take other appropriate actions
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      // Handle unexpected errors here
    }


    
  };

  return (
    <div class="flex flex-col gap-2 items-center self-center mt-40">
      <div
        onsubmit={onSubmit}
        class="flex flex-col gap-2 items-center self-center top-1/2"
      >
        <Show
          when={!supplier()}
          fallback={
            <div class="flex flex-col gap-2 items-center self-center top-1/2">
              <TextInput
                name="Organization Name"
                control={group.controls.firstName}
              ></TextInput>
              <TextInput
                name="Street Address"
                control={group.controls.firstName}
              ></TextInput>
              <TextInput
                name="City"
                control={group.controls.firstName}
              ></TextInput>
              <TextInput
                name="State"
                control={group.controls.firstName}
              ></TextInput>
              <TextInput
                name="Zip"
                control={group.controls.firstName}
              ></TextInput>
              <TextInput
                name="Website URL"
                control={group.controls.firstName}
              ></TextInput>
              <TextInput
                name="Description of Items"
                control={group.controls.firstName}
              ></TextInput>
              
            </div>
          }
        >
          <TextInput
            name="First Name"
            control={group.controls.firstName}
          ></TextInput>

          <TextInput
            name="Last Name"
            control={group.controls.lastName}
          ></TextInput>
        </Show>

        <TextInput name="Email" control={group.controls.email}></TextInput>

        <TextInput
          name="Reenter Email"
          control={group.controls.reEnterEmail}
        ></TextInput>

        <div class="flex gap-2 self-start items-center">
          Supplier
          <Checkbox class="my-2" onchange={() => setSupplier(!supplier())} />
        </div>
        <Show when={supplier()}>
          <div class="flex flex-col gap-2 items-center self-center top-1/2"></div>
        </Show>
        <Button
          onClick={onSubmit}
          variant="contained"
          color="success"
          disabled={!group.isValid}
          
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Signup;
