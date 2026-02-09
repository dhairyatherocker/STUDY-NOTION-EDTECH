import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa"

function FooterColumn({ title, items }) {
  return (
    <div>
      <h3 className="mb-3 font-semibold text-white">{title}</h3>
      <ul className="space-y-2 text-sm text-richblack-300">
        {items.map((item, index) => (
          <li
            key={index}
            className="cursor-pointer transition hover:text-white"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-richblack-900">
      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* Top Section */}
        <div className="grid grid-cols-2 gap-10 border-b border-richblack-700 pb-10 md:grid-cols-6">

          {/* Brand */}
          <div className="col-span-2">
            <h2 className="text-xl font-bold text-white">StudyNotion</h2>
            <p className="mt-4 text-sm text-richblack-400">
              Learn, practice and grow with industry-ready courses.
            </p>

            <div className="mt-4 flex gap-4 text-lg text-richblack-300">
              <FaFacebook />
              <FaTwitter />
              <FaYoutube />
              <FaLinkedin />
            </div>
          </div>

          <FooterColumn
            title="Resources"
            items={[
              "Articles",
              "Blog",
              "Chart Sheet",
              "Code Challenges",
              "Docs",
              "Projects",
              "Videos",
              "Workspaces",
            ]}
          />

          <FooterColumn
            title="Community"
            items={["Forums", "Chapters", "Events"]}
          />

          <FooterColumn
            title="Subjects"
            items={[
              "AI",
              "Cloud Computing",
              "Cybersecurity",
              "Data Science",
              "Web Development",
              "Machine Learning",
            ]}
          />

          <FooterColumn
            title="Languages"
            items={[
              "C",
              "C++",
              "Java",
              "JavaScript",
              "Python",
              "Go",
              "SQL",
              "Swift",
            ]}
          />

          <FooterColumn
            title="Career building"
            items={[
              "Career paths",
              "Interview prep",
              "Professional certification",
              "Full Catalog",
              "Beta Content",
            ]}
          />
        </div>

        {/* Bottom Section */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-sm text-richblack-400 md:flex-row">
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-white">
              Privacy Policy
            </span>
            <span className="cursor-pointer hover:text-white">
              Cookie Policy
            </span>
            <span className="cursor-pointer hover:text-white">Terms</span>
          </div>

          <p>
            Made with ❤️ by Dhairya rathore © StudyNotion
          </p>
        </div>
      </div>
    </footer>
  )
}
