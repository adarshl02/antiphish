import { Menu, History, FileText, Image, LogOut, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const AppDrawer = () => {
  const { user, userTextHistory, userImageHistory } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('AntiPhishXauthToken');
    window.location.reload();
    toast.success("Logged out successfully");
  };

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:fortress-card md:border md:border-accent/30 hover:bg-accent/10 "
        >
          <Menu className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-80 fortress-card border-r border-accent/20">
        <DrawerHeader className="border-b border-accent/20">
          <DrawerTitle className="text-lg md:text-2xl font-bold flex items-center gap-2">
            <History className="h-6 w-6 text-primary" />
            User History
          </DrawerTitle>
          <DrawerDescription className="text-muted-foreground text-xs md:text-sm">
            Access your analysis history
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-auto p-4 text-sm md:text-base">
          {user ? (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="text" className="border-accent/20">
                <AccordionTrigger className="text-foreground hover:text-primary">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Text Analysis ({userTextHistory.length})
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {userTextHistory.length === 0 ? (
                    <div className="text-sm text-muted-foreground p-2">
                      No text analysis history yet. Start analyzing text to see your history here.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {userTextHistory.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => navigate(`/history/text/${item.id}`)}
                          className="w-full text-left p-3 rounded-lg border border-accent/20 hover:bg-accent/10 transition-colors"
                        >
                          <p className="text-sm text-foreground line-clamp-2 mb-2">
                            {item.text}
                          </p>
                          <div className="flex items-center gap-2">
                            {item.verdict.isPhishing ? (
                              <AlertTriangle className="h-3 w-3 text-danger" />
                            ) : (
                              <CheckCircle className="h-3 w-3 text-success" />
                            )}
                            <span className="text-xs text-muted-foreground">
                              {item.verdict.verdict}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="image" className="border-accent/20">
                <AccordionTrigger className="text-foreground hover:text-primary">
                  <div className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    Image Analysis ({userImageHistory.length})
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {userImageHistory.length === 0 ? (
                    <div className="text-sm text-muted-foreground p-2">
                      No image analysis history yet. Start analyzing images to see your history here.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {userImageHistory.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => navigate(`/history/image/${item.id}`)}
                          className="w-full text-left p-3 rounded-lg border border-accent/20 hover:bg-accent/10 transition-colors"
                        >
                          <div className="flex gap-3 mb-2">
                            <img
                              src={item.s3BucketUrl}
                              alt="Preview"
                              className="w-16 h-16 object-cover rounded border border-accent/20"
                            />
                            <div className="flex-1 min-w-0">
                              {item.text && (
                                <p className="text-sm text-foreground line-clamp-2">
                                  {item.text}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.verdict.isPhishing ? (
                              <AlertTriangle className="h-3 w-3 text-danger" />
                            ) : (
                              <CheckCircle className="h-3 w-3 text-success" />
                            )}
                            <span className="text-xs text-muted-foreground">
                              {item.verdict.verdict}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <div className="text-center text-muted-foreground p-4">
              Please sign in to view your history
            </div>
          )}
        </div>

        <DrawerFooter className="border-t border-accent/20">
          {user && (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-danger/30 text-danger hover:bg-danger/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          )}
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};