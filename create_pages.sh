#!/bin/bash

# Array of pages to create
pages=("about" "careers" "help" "safety" "contact" "fraud" "sitemap" "inspections")

# Template for simple page
template() {
    title=$1
    cat <<EOF
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "$title | Kaarplus",
  description: "$title page for Kaarplus",
};

export default function Page() {
  return (
    <div className="container py-16 min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6">$title</h1>
      <p className="text-slate-600 dark:text-slate-400">
        This page is currently under construction. Please check back later.
      </p>
    </div>
  );
}
EOF
}

# Create directories and files
for page in "${pages[@]}"; do
    mkdir -p "apps/web/src/app/(public)/$page"
    
    # Check if file exists to avoid overwriting
    if [ ! -f "apps/web/src/app/(public)/$page/page.tsx" ]; then
        # Capitalize first letter for title
        title="$(tr '[:lower:]' '[:upper:]' <<< ${page:0:1})${page:1}"
        template "$title" > "apps/web/src/app/(public)/$page/page.tsx"
        echo "Created page: $page"
    else
        echo "Page exists: $page"
    fi
done
