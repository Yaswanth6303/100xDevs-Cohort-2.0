import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Docs</CardTitle>
          <CardDescription>
            Sharing @repo/ui with apps/web — zero duplication.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
        </CardContent>
      </Card>
    </main>
  );
}
