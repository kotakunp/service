import { Button } from "@/components/ui/button";
import Link from "next/link";

export function NoProducts() {
  return (
    <div className="flex w-screen min-h-[] items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-semibold mb-2">You have no products</h1>
        <p className="mb-4">
          Get started with PPP discounts by creating a product
        </p>
        <Button size="lg" asChild>
          <Link href="/dashboard/products/new">Add Product</Link>
        </Button>
      </div>
    </div>
  );
}
