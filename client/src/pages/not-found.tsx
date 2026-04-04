import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 font-arabic">
      <div className="glass-card p-12 rounded-3xl text-center max-w-md w-full border border-gray-100 shadow-2xl">
        <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>
        
        <h1 className="text-4xl font-black text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-700 mb-6">الصفحة غير موجودة</h2>
        
        <p className="text-gray-500 mb-8 leading-relaxed">
          عذراً، الصفحة التي تحاول الوصول إليها غير موجودة أو تم نقلها.
        </p>

        <Link href="/" className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
