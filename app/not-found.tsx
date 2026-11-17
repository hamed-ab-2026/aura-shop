import Link from "next/link";

export default function NotFound() {
    return (
        <div className="wrap page not-found">
            <p className="eyebrow">۴۰۴</p>
            <h1>صفحه پیدا نشد</h1>
            <p>آدرس اشتباه است یا صفحه حذف شده است.</p>
            <Link className="btn btn--lg" href="/">بازگشت به صفحه‌ی اصلی</Link>
        </div>
    );
}
