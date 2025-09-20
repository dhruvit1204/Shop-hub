import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AUTH_ENDPOINTS } from "@/config/api";
import { ToastContainer } from 'react-toastify';

export function AuthModals() {
  const { toast } = useToast();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [signupOtp, setSignupOtp] = useState("");
  const [signupStep, setSignupStep] = useState<'form' | 'otp'>('form');

  // Signup handler
  const handleSignup = async () => {
    try {
      setIsLoading(true);
      // Call backend signup API (register, expects name, email, phone, password)
      const response = await fetch(AUTH_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          phone: '0000000000', // dummy phone, since backend expects it
          password: signupPassword
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Signup failed');
      toast({ title: 'OTP Sent', description: 'Check your email for OTP verification.' });
      setSignupStep('otp');
    } catch (error: any) {
      toast({ title: 'Signup Failed', description: error.message || 'Failed to signup.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifySignupOtp = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(AUTH_ENDPOINTS.VERIFY_OTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: signupEmail,
          otp: signupOtp
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'OTP verification failed');
      toast({ title: 'Signup Successful', description: 'Your account has been created!' });
      window.signup_modal.close();
      setSignupEmail(""); setSignupName(""); setSignupPassword(""); setSignupOtp(""); setSignupStep('form');
      window.location.reload();
    } catch (error: any) {
      toast({ title: 'OTP Verification Failed', description: error.message || 'Failed to verify OTP.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  // Login handler
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      // Call backend login API
      const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      if (data.token) localStorage.setItem('authToken', data.token);
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
      toast({ title: 'Login Successful', description: 'Welcome back to ShopHub!' });
      window.auth_modal.close();
      setLoginEmail(""); setLoginPassword("");
      window.location.reload();
    } catch (error: any) {
      toast({ title: 'Login Failed', description: error.message || 'Failed to login.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Login Modal */}
      <dialog id="auth_modal" className="modal">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-200 bg-white/80">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center text-primary">Login</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Email Address</label>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Password</label>
                <div className="relative">
                  <Input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground"
                    onClick={() => setShowLoginPassword(v => !v)}
                    tabIndex={-1}
                  >
                    {showLoginPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <Button
                className="w-full btn-primary"
                onClick={handleLogin}
                disabled={!loginEmail || !loginPassword || isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  </div>
                ) : 'Log In'}
              </Button>
              <div className="mt-6 text-center text-sm">
                <p className="text-muted-foreground">
                  Don't have an account?{' '}
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => {
                      window.auth_modal.close();
                      window.signup_modal.showModal();
                    }}
                    disabled={isLoading}
                  >
                    Sign up
                  </Button>
                </p>
              </div>
              <form method="dialog" className="mt-6">
                <Button variant="outline" className="w-full btn-outline" disabled={isLoading}>Close</Button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
      {/* Signup Modal */}
      <dialog id="signup_modal" className="modal">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-8 w-full max-w-md shadow-lg">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center text-primary">Create your ShopHub Account</h2>
            {signupStep === 'form' ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Full Name</label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={signupName}
                    onChange={e => setSignupName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email Address</label>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={signupEmail}
                    onChange={e => setSignupEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Password</label>
                  <div className="relative">
                    <Input
                      type={showSignupPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={signupPassword}
                      onChange={e => setSignupPassword(e.target.value)}
                      disabled={isLoading}
                    />
                    <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground" onClick={() => setShowSignupPassword(v => !v)} tabIndex={-1}>
                      {showSignupPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Password must be at least 8 characters and contain a mix of letters and numbers.
                  </div>
                </div>
                <Button
                  className="w-full btn-primary"
                  onClick={handleSignup}
                  disabled={!signupName || !signupEmail || !signupPassword || signupPassword.length < 8 || isLoading}
                >
                  {isLoading ? (
                    <div className="flex justify-center">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    </div>
                  ) : "Create Account"}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Enter OTP</label>
                  <Input
                    type="text"
                    placeholder="Enter the OTP sent to your email"
                    value={signupOtp}
                    onChange={e => setSignupOtp(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <Button
                  className="w-full btn-primary"
                  onClick={handleVerifySignupOtp}
                  disabled={!signupOtp || isLoading}
                >
                  {isLoading ? (
                    <div className="flex justify-center">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    </div>
                  ) : "Verify & Create Account"}
                </Button>
                <Button
                  variant="link"
                  className="w-full"
                  onClick={() => { setSignupStep('form'); setSignupOtp(""); }}
                  disabled={isLoading}
                >
                  Change Email Address
                </Button>
              </div>
            )}
            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Already have an account?{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => {
                    window.signup_modal.close();
                    window.auth_modal.showModal();
                  }}
                  disabled={isLoading}
                >
                  Log in
                </Button>
              </p>
            </div>
            <form method="dialog" className="mt-6">
              <Button variant="outline" className="w-full btn-outline" disabled={isLoading}>Close</Button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
