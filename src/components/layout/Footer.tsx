export default function Footer() {
    return (
        <footer className="flex items-center justify-center bg-zinc-50 px-4 py-3 border-t border-zinc-200">
            <p>{__BUILD_VERSION__} ({__BUILD_NUMBER__}) © 2026 Tous droits réservés.</p>
        </footer>
    );
}