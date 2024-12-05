"use client";
import { TabsContent } from "@radix-ui/react-tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FormSchema = z.object({
  layout: z.enum(["standard", "suggested"], {
    required_error: "You need to select a layout type.",
  }),
});

export default function SupportersSettings() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <TabsContent value="settings" className="py-5">
      {/* <h3 className="mb-4 text-xl font-semibold"></h3> */}
      <Form {...form}>
        <form className="" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="layout"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="mb-4 text-xl font-semibold">
                  Choose a layout
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="">
                      <Card className="flex flex-col bg-[rgb(34,34,34)]/[.04] p-4">
                        <CardHeader className="p-0">
                          <div className="flex gap-2 items-center">
                            <FormControl>
                              <RadioGroupItem value="standard" />
                            </FormControl>
                            <FormLabel className="text-xl font-normal">
                              Standard View
                            </FormLabel>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6 mx-auto mt-6 bg-white rounded-md border shadow-sm max-w-[280px]">
                          <CardTitle className="mb-2">
                            Buy Al-Ameen Adeyemi a Beer
                          </CardTitle>
                          <Image
                            height={400}
                            width={200}
                            alt="Standard"
                            src={"/profile-pic.png"}
                          />
                        </CardContent>
                      </Card>
                    </FormItem>
                    {/* <FormItem className="flex items-center space-y-0 space-x-3"> */}
                    {/*   <FormControl> */}
                    {/*     <RadioGroupItem value="suggested" /> */}
                    {/*   </FormControl> */}
                    {/*   <FormLabel className="font-normal">Suggested</FormLabel> */}
                    {/* </FormItem> */}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </TabsContent>
  );
}
