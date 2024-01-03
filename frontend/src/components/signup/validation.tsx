import { Show, mergeProps, type Component, For } from "solid-js";
import { IFormControl, ValidationErrors, createFormControl } from "solid-forms";
import { Input, TextField } from "@suid/material";

export const validators = {
  required: (value: string) =>
    value.length === 0 ? { isMissing: "*Field required." } : null,
  email: (value: string) =>
    value.length === 0 || !value.includes("@")
      ? { invalidEmail: "*Invalid email address." }
      : null,
  matchesEmail: (prev: string, value: string) =>
    value === prev ? "*Passwords must Match" : null,
  emailExists: async (value: string) => {
    // TODO check if email is in use
    //const exists = await fetchUserName(value);
    //return exists && `${value} is already being used`;
    return null;
  },
};

export const TextInput: Component<{
  control?: IFormControl<string>;
  name: string;
}> = (props) => {
  return (
    <div class="flex flex-col gap-2 mb-3">
      <TextField
        label={props.name}
        variant="outlined"
        name={props.name}
        onChange={(e) => {
          console.log(props.control?.isTouched, props.control?.isValid);
          props.control?.setValue(e.target.value);
        }}
        onBlur={() => props.control?.markTouched(true)}
        onFocus={() => props.control?.markTouched(true)}
        required={props.control?.isRequired}
      />

      <Show when={props.control?.isTouched && !props.control?.isValid}>
        <For each={Object.values(props.control?.errors ?? {})}>
          {(errorMsg: string) => (
            <small class="text-[rgb(255,0,0)] self-center">{errorMsg}</small>
          )}
        </For>
      </Show>
    </div>
  );
};
