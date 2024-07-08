import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("An error occurred while fetching cabins");
  }

  return data;
}

export async function deleteCabin(cabin) {
  let { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabin.id);

  if (error) {
    console.log(error);
    throw new Error("An error occurred while deleting the cabin");
  }

  const { error: imageError } = await supabase.storage
    .from("cabin-images")
    .remove([cabin.image.split("/").pop()?.split("?")[0]]);

  if (imageError) {
    console.log(imageError);
    throw new Error("An error occurred while deleting the image");
  }

  return data;
}

export async function createEditCabin(newCabin, cabinId) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  let imageData = {};
  if (!hasImagePath) {
    const { data, error: imageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (imageError) {
      console.log(imageError);
      throw new Error("An error occurred while uploading the image");
    }

    imageData = data;
  }

  const imagePath = hasImagePath
    ? newCabin?.image
    : `https://bdmulytkkwfaehbvtpuq.supabase.co/storage/v1/object/public/${imageData.fullPath}`;

  console.log({ imagePath, hasImagePath });
  let query = supabase.from("cabins");

  // If there is no cabinId, we are creating a new cabin
  if (!cabinId) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // If there is a cabinId, we are updating an existing cabin
  if (cabinId) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", cabinId);
  }

  let { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("An error occurred while creating the cabin");
  }

  return data;
}
