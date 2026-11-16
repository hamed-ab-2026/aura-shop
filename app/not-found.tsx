import Link from "next/link";

export default function NotFound() {
    return (
        <div className="empty">
            <h1>صفحه پیدا نشد</h1>
            <p>آدرس اشتباه است یا صفحه حذف شده است.</p>
            <Link className="btn" href="/">بازگشت به فروشگاه</Link>
        </div>
    );
}
