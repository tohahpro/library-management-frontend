/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { FormProvider, useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { PiBookOpenText } from "react-icons/pi";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { formatDate } from "date-fns";
import { CalendarIcon } from "lucide-react";


export function BorrowBookModal(data: any) {
  const form = useForm()

  const [open, setOpen] = useState(false);

  


  const onSubmit: SubmitHandler<FieldValues> = async(e) => {

    console.log(e);
    
    
    setOpen(false)
    form.reset();
  }

  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-4 py-1 bg-[#da8e81] text-white rounded hover:bg-[#7e534c] hover:animate-pulse hover:text-white" variant="outline">Borrow Book <PiBookOpenText className="font-bold text-2xl"/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-xl space-y-4">
        <DialogHeader>
          <DialogTitle className="text-center font-[Montserrat] pb-6">Borrow Book</DialogTitle>
          <DialogTitle className="text-base font-[Montserrat] font-medium"><span>Title : </span>{data?.data?.title}</DialogTitle>
          <DialogTitle className="text-[13px] font-[Montserrat] font-medium"><span>Available Copies : </span>{data?.data?.copies}</DialogTitle>

        </DialogHeader>

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
                          <FormControl>
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
                                <span>select a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Calendar
                            mode="single"
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
              <Button className="w-full py-5" type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
