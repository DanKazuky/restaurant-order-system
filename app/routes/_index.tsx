import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export const loader: LoaderFunction = async () => {
  return redirect("./orders");
};
