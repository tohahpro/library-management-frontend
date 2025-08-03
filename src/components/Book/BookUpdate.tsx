/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    FormProvider,
    useForm,
    type FieldValues,
    type SubmitHandler
} from "react-hook-form";
import toast from "react-hot-toast";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "../ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../ui/select";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { useParams } from "react-router";
import {
    useGetBookByIdQuery,
    useUpdateBookMutation
} from "@/redux/Api/baseApi";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const BookUpdate = () => {
    const { id } = useParams();
    const { data } = useGetBookByIdQuery(id);
    const [updateBook] = useUpdateBookMutation();
    const [isReady, setIsReady] = useState(false);

    const form = useForm({
        defaultValues: {
            title: "",
            author: "",
            genre: "",
            isbn: "",
            availability: "available",
            copies: 0,
            imageURL: "",
            description: ""
        }
    });

    useEffect(() => {
        if (data) {
            form.reset({
                title: data.title,
                author: data.author,
                genre: data.genre,
                isbn: data.isbn,
                availability: data.available ? "available" : "unavailable", // ✅ convert boolean to string
                copies: data.copies || 0,
                imageURL: data.imageURL || "",
                description: data.description
            });
            setIsReady(true);
        }
    }, [data, form]);

    const onSubmit: SubmitHandler<FieldValues> = async (formData: any) => {
        const updateData = {
            title: formData.title,
            author: formData.author,
            genre: formData.genre,
            isbn: formData.isbn,
            available: formData.availability === "available", // ✅ convert string to boolean
            copies: formData.copies,
            imageURL: formData.imageURL,
            description: formData.description
        };

        try {
            await updateBook({ id, data: updateData }).unwrap();
            toast.success("Book updated successfully");

            form.reset({
                title: "",
                author: "",
                genre: "",
                isbn: "",
                availability: "available",
                copies: 0,
                imageURL: "",
                description: ""
            });
        } catch (error: any) {
            const fullMessage = error?.data?.error || "Failed to update book";

            const errorMessage = fullMessage.includes("Book validation failed:")
                ? fullMessage.split("Book validation failed:")[1].trim()
                : fullMessage;

            toast.error(`❌ ${errorMessage}`);
        }
    };

    return (
        <div className="w-4/6 mx-auto font-[Montserrat] bg-[#F1F1F1] rounded-md">
            <h3 className="text-center font-bold text-xl pt-10">
                Update <span className="text-[#E59285]">Book</span>
            </h3>

            {!isReady ? (
                <p className="text-center mt-10">Loading...</p>
            ) : (
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
                                                <Select onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
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
                                                        defaultValue={field.value}
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
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    required
                                                >
                                                    <FormControl className="w-full">
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select availability" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="available">Available</SelectItem>
                                                        <SelectItem value="unavailable">
                                                            Unavailable
                                                        </SelectItem>
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
                                <Button
                                    className="w-full py-5 bg-[#E59285]"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </DialogFooter>
                        </form>
                    </FormProvider>
                </div>
            )}
        </div>
    );
};

export default BookUpdate;
