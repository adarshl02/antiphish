import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "./ui/dropdown-menu";
import { LogOut, User as UserIcon } from "lucide-react";
import { googleSignup } from "@/service/authservice";
import { toast } from "sonner";
import axios from "axios";

export const GoogleLoginButton = () => {
  const { user, isLoading } = useAuth();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info from Google
        console.log(tokenResponse);
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        const data = {
          name: userInfo.data.name,
          email: userInfo.data.email,
          avatar: userInfo.data.picture,
          uid: userInfo.data.sub
        };

        const response = await googleSignup(data);
        
        if (response.success && response.data) {
          localStorage.setItem('AntiPhishXauthToken', response.data);
          window.location.reload();
          toast.success("Successfully signed in!");
        } else {
          toast.error("Sign in failed. Please try again.");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Sign in failed. Please try again.");
      }
    },
    onError: () => {
      toast.error("Sign in failed. Please try again.");
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('AntiPhishXauthToken');
    window.location.reload();
    toast.success("Logged out successfully");
  };

  if (isLoading) {
    return (
      <div className="w-10 h-10 rounded-full bg-card/50 animate-pulse" />
    );
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 md:h-10 md:w-10 rounded-full hover:bg-accent/20 fortress-card border border-accent/30"
          >
            <Avatar className="h-7 w-7 md:h-9 md:w-9">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                <UserIcon className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-56 fortress-card border-accent/20 bg-card" 
          align="end"
        >
          <div className="px-3 py-2 border-b border-accent/20">
            <p className="text-sm font-medium text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
          <DropdownMenuItem 
            onClick={handleLogout} 
            className="text-danger hover:bg-danger/10 cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      onClick={() => login()}
      className="fortress-card border border-accent/30 bg-card hover:bg-accent/10 text-foreground gap-2"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="currentColor"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="currentColor"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="currentColor"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      Sign In
    </Button>
  );
};