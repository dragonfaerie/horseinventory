import React from "react";
import { Link } from "react-router-dom";

type AdminLink = {
  title: string;
  description: string;
  to: string;
};

const ADMIN_LINKS: AdminLink[] = [
  {
    title: "Breeds",
    description: "Add or rename horse breeds.",
    to: "/admin/breeds",
  },
  {
    title: "Breed Types",
    description: "Map breeds to their broader types.",
    to: "/admin/breed-types",
  },
  { title: "Colors", description: "Curate available coat colors.", to: "/admin/colors" },
  {
    title: "Conditions",
    description: "Update condition grades for horses.",
    to: "/admin/conditions",
  },
  { title: "Finish", description: "Maintain finish options.", to: "/admin/finish" },
  { title: "Genders", description: "Configure gender values.", to: "/admin/gender" },
  { title: "Locations", description: "Add barns, shelves, or storage.", to: "/admin/locations" },
  {
    title: "Manufacturers",
    description: "Keep the maker list accurate.",
    to: "/admin/manufacturers",
  },
  { title: "Models", description: "Create new release models.", to: "/admin/models" },
  { title: "Molds", description: "Associate molds with manufacturers.", to: "/admin/molds" },
  { title: "Patterns", description: "Manage pattern inspirations.", to: "/admin/patterns" },
  { title: "Run Types", description: "Track run types and editions.", to: "/admin/run-types" },
  { title: "Scales", description: "Define display scale options.", to: "/admin/scales" },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto mt-6 px-4">
      <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-white shadow-xl">
        <div className="border-b border-blue-100 px-6 py-5">
          <p className="text-sm font-medium text-blue-700 uppercase tracking-wide">
            Admin Toolkit
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-800">
            Keep the reference data fresh
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-3xl">
            Add new models, molds, and supporting values using the tiles below. Each link drops you into the form to add a new item or review existing entries.
          </p>
        </div>

        <div className="px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADMIN_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group flex h-full flex-col justify-between rounded-2xl border border-blue-100 bg-white/90 p-4 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                    Manage
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-800">
                    {link.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{link.description}</p>
                </div>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600">
                  Open form
                  <svg
                    className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 0 1 .75-.75h10.19l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
