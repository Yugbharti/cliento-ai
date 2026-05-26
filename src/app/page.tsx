import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Alert className="bg-red-600">This is a Next App.</Alert>
      <Button variant="ghost">Click me</Button>
    </div>
  );
}
