"use client";
import { TabsContent } from "@radix-ui/react-tabs";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@repo/ui/components/ui/form";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";

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
      {/* <h3 className="text-xl font-semibold mb-4"></h3> */}
      <Form {...form}>
        <form className="" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="layout"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-xl font-semibold mb-4">
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
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <RadioGroupItem value="standard" />
                            </FormControl>
                            <FormLabel className="font-normal text-xl">
                              Standard View
                            </FormLabel>
                          </div>
                        </CardHeader>
                        <CardContent className="bg-white p-6 rounded-md mt-6 max-w-[280px] mx-auto border shadow-sm">
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
                    {/* <FormItem className="flex items-center space-x-3 space-y-0"> */}
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
