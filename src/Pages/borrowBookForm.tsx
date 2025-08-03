/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DialogFooter } from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useBorrowBookMutation, useGetBookByIdQuery } from "@/redux/Api/baseApi";
import { formatDate } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FormProvider, useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";


const borrowBookForm = () => {

    const form = useForm()
    const { bookId } = useParams()
    const navigate = useNavigate();

    const { data } = useGetBookByIdQuery(bookId)

    const [borrowBook] = useBorrowBookMutation();


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(bookId);
        try {
            const payload = {
                book: bookId || '',
                quantity: Number(data.quantity),
                dueDate: data.dueDate,
            };
            await borrowBook(payload).unwrap();
            toast.success("✅ Book borrowed successfully!");

            form.reset();
            navigate("/borrow-summary");

        } catch (error: any) {
            const errorMessage =
                error?.data?.message || "Something went wrong. Please try again.";

            toast.error(`❌ ${errorMessage}`);
        }


    }

    return (
        <div className="w-4/5 mx-auto mt-16">
            <div className="p-8 bg-[#F1F1F1] rounded-md shadow-xl">
                <div className="py-5 space-y-2">
                    <p className="text-center text-xl font-[Montserrat] font-semibold pb-6">Borrow <span  className="text-[#E59285]">Book</span></p>
                    <p className="text-base font-[Montserrat] font-medium"><span>Title : </span>{data?.title}</p>
                    <p className="text-[13px] font-[Montserrat] font-medium"><span>Available Copies : </span>{data?.copies}</p>
                </div>
                <div>
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            <div className="flex gap-5">
                                <div className="flex-1">
                                    <FormField
                                        control={form.control}
                                        name="quantity"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Quantity </FormLabel>
                                                <FormControl>
                                                    <Input {...field}
                                                        required
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
                                        name="dueDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Due Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl className="bg-transparent">
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    formatDate(field.value, "PPP")
                                                                ) : (
                                                                    <span className="text-black">select a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-full p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            required
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date < new Date() || date < new Date("2000-01-01")
                                                            }
                                                            captionLayout="dropdown"
                                                        />
                                                    </PopoverContent>
                                                </Popover>
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
        </div>
    );
};

export default borrowBookForm;