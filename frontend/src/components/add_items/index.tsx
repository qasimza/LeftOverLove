import { Typography } from "@suid/material";
import { createFormControl, createFormGroup } from "solid-forms";
import { PostItem } from "../../services/order";
import BasicAppBar from "../navbar home/navbarHome";
import { TextInput } from "../signup/validation";

export default function AddItems(){
    const onSubmit = () => {
        PostItem(group)
    }
    const group = createFormGroup({
        title: createFormControl("Title", {required: true}),
        description: createFormControl("Description", {required: false}),
        quantity: createFormControl("Quantity", {required: true})})
    return(
    <>
    <BasicAppBar />
    <Typography variant="h4" class="mb-3">
          Add Items
        </Typography>
        <div class="flex flex-col gap-2 items-center self-center mt-40">
      <div
        onsubmit={onSubmit}
        class="flex flex-col gap-2 items-center self-center top-1/2"
      >
        <TextInput
            name="Title"
            control={group.control.title}
          ></TextInput>

          <TextInput
            name="Description"
            control={group.controls.description}
          ></TextInput>

        <TextInput
            name="Quantity"
            control={group.control.quantity}
          ></TextInput>
        </div>
        </div>
    </>)
}


