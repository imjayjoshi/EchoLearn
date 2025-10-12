import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, Music } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const AdminPhrases = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const phrases = [
    {
      id: 1,
      phrase: "Hello, how are you today?",
      language: "English",
      category: "Greetings",
      audioFile: "hello.mp3",
      createdBy: "Admin",
    },
    {
      id: 2,
      phrase: "Could you please help me?",
      language: "English",
      category: "Common",
      audioFile: "help.mp3",
      createdBy: "Admin",
    },
    {
      id: 3,
      phrase: "I would like to make a reservation",
      language: "English",
      category: "Restaurant",
      audioFile: "reservation.mp3",
      createdBy: "Admin",
    },
    {
      id: 4,
      phrase: "Where is the nearest station?",
      language: "English",
      category: "Travel",
      audioFile: "station.mp3",
      createdBy: "Admin",
    },
    {
      id: 5,
      phrase: "Thank you very much",
      language: "English",
      category: "Greetings",
      audioFile: "thanks.mp3",
      createdBy: "Admin",
    },
  ];

  const filteredPhrases = phrases.filter((phrase) =>
    phrase.phrase.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Phrase Management
          </h2>
          <p className="text-muted-foreground">
            Add, edit, and manage practice phrases
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="action">
              <Plus className="w-4 h-4" />
              Add New Phrase
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Phrase</DialogTitle>
              <DialogDescription>
                Upload a new phrase with native audio pronunciation
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="phrase">Phrase Text</Label>
                <Input id="phrase" placeholder="Enter the phrase..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input id="language" placeholder="English" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" placeholder="Greetings" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="audio">Audio File</Label>
                <div className="flex items-center gap-2">
                  <Input id="audio" type="file" accept="audio/*" />
                  <Button variant="outline" size="icon">
                    <Music className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="action" onClick={() => setIsDialogOpen(false)}>
                Save Phrase
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>All Phrases</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search phrases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Phrase</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Audio File</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPhrases.map((phrase) => (
                  <TableRow key={phrase.id}>
                    <TableCell className="font-medium max-w-xs">
                      {phrase.phrase}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{phrase.language}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{phrase.category}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {phrase.audioFile}
                    </TableCell>
                    <TableCell>{phrase.createdBy}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPhrases;
