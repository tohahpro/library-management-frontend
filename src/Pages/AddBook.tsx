/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBookMutation } from "@/redux/Api/baseApi";
import { Select } from "@radix-ui/react-select";
import { FormProvider, useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";


const AddBook = () => {
  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      availability: "available",
      copies: "",
      imageURL: "",
      description: "",
    },
  })

  const [createBook] = useCreateBookMutation()


  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {

    try {
      const res = await createBook(data).unwrap()
      console.log("form data", res);
      form.reset({
        title: "",
        author: "",
        genre: "",
        isbn: "",
        availability: "available",
        copies: "",
        imageURL: "",
        description: ""
      })
      toast.success("Book added successfully");
    } catch (error) {
      const fullMessage = error?.data?.error || "Field to create book";

      const errorMessage = fullMessage.includes("Book validation failed:")
        ? fullMessage.split("Book validation failed:")[1].trim()
        : fullMessage;

      toast.error(`❌ ${errorMessage}`);
    }

  }

  return (
    <div className="w-4/6 mx-auto font-[Montserrat] bg-[#F1F1F1] rounded-md">
      <h3 className="text-center font-bold text-xl pt-10">Add New <span className="text-[#E59285]">Book</span></h3>
      <div className="p-10">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-5">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} required
                          placeholder="Book Title"
                          value={field.value || ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input {...field} required
                          value={field.value || ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>


            <div className="flex gap-5">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="select genre" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="FICTION">FICTION</SelectItem>
                          <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                          <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                          <SelectItem value="HISTORY">HISTORY</SelectItem>
                          <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                          <SelectItem value="FANTASY">FANTASY</SelectItem>

                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="isbn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ISBN</FormLabel>
                      <FormControl>
                        <Input {...field} required
                          value={field.value || ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="copies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Copies</FormLabel>
                      <FormControl>
                        <Input {...field} required
                          placeholder="Copies"
                          type="number"
                          value={field.value || ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="select genre" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="unavailable">Unavailable</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="imageURL"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image Url</FormLabel>
                      <FormControl>
                        <Input {...field} required
                          value={field.value || ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} required
                          value={field.value || ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button className="w-full py-5 bg-[#E59285]" type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddBook;