import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useUpdateCabin } from "./useUpdateCabin";
import { useCreateCabin } from "./useCreateCabin";

function CreateCabinForm({ currentCabin = {}, onCloseModal }) {
  const { id: editCabinId, ...resetValues } = currentCabin;
  const isEditingSession = Boolean(editCabinId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: isEditingSession ? resetValues : {},
  });

  const { isUpdating, updateCabin } = useUpdateCabin();
  const { isCreating, createNewCabin } = useCreateCabin();

  function onSubmit(data) {
    console.log({ data });

    const image = typeof data.image === "string" ? data.image : data.image?.[0];
    if (isEditingSession) {
      return updateCabin(
        {
          newCabinData: { ...data, image },
          cabinId: editCabinId,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createNewCabin(
        { ...data, image: data.image?.[0] },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  const isWorking = isCreating || isUpdating;
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow
        name="name"
        label="Cabin name"
        error={errors?.name?.message}
        disabled={isWorking}
        Component={
          <Input
            type="text"
            id="name"
            {...register("name", {
              required: "Name is required",
            })}
          />
        }
      />

      <FormRow
        name="maxCapacity"
        label="Maximum capacity"
        error={errors?.maxCapacity?.message}
        disabled={isWorking}
        Component={
          <Input
            type="number"
            id="maxCapacity"
            {...register("maxCapacity", {
              required: "Maximum capacity is required",
              min: {
                value: 1,
                message: "Minimum capacity is 1",
              },
              max: {
                value: 10,
                message: "Maximum capacity is 10",
              },
            })}
          />
        }
      />

      <FormRow
        name="regularPrice"
        label="Regular price"
        error={errors?.regularPrice?.message}
        disabled={isWorking}
        Component={
          <Input
            type="number"
            id="regularPrice"
            {...register("regularPrice", {
              required: "Regular price is required",
              min: {
                value: 1,
                message: "Minimum price is 1",
              },
            })}
          />
        }
      />

      <FormRow
        name="discount"
        label="Discount"
        error={errors?.discount?.message}
        disabled={isWorking}
        Component={
          <Input
            type="number"
            id="discount"
            defaultValue={0}
            {...register("discount", {
              validate: (value) => {
                if (value >= getValues("regularPrice")) {
                  return "Discount must be less than regular price";
                }
                return true;
              },
            })}
          />
        }
      />

      <FormRow
        name="description"
        label="Description for website"
        error={errors?.description?.message}
        disabled={isWorking}
        Component={
          <Textarea
            type="number"
            id="description"
            defaultValue=""
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
          />
        }
      />

      <FormRow
        name="image"
        label="Cabin photo"
        error={errors?.image?.message}
        disabled={isWorking}
        Component={
          <FileInput
            id="image"
            type="file"
            accept="image/*"
            {...register("image", {
              required: isEditingSession ? false : "Image is required",
            })}
          />
        }
      />

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditingSession ? "Update Cabin" : "Create new Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
