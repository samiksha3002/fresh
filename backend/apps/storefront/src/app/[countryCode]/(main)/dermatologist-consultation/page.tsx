
export default function DermatologistConsultationPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs uppercase tracking-[0.22em] text-[#987653]">
          Kovea Touch · Personalised Guidance
        </p>

        <h1 className="mt-4 text-3xl font-medium tracking-tight text-black sm:text-4xl">
          Let's talk about your skin.
        </h1>

        <p className="mt-3 text-sm leading-7 text-[#6b625a]">
          Have a skincare question? Share a few details with us
          and connect with our dermatologist for personalised guidance.
        </p>

        <form className="mt-9 space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-black"
            >
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Enter your name"
              className="w-full border border-[#e5e0d9] bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-black"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="w-full border border-[#e5e0d9] bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-black"
              >
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                placeholder="Enter phone number"
                className="w-full border border-[#e5e0d9] bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="concern"
              className="mb-2 block text-sm font-medium text-black"
            >
              What would you like help with?
            </label>
            <select
              id="concern"
              name="concern"
              required
              defaultValue=""
              className="w-full border border-[#e5e0d9] bg-white px-4 py-3 text-sm text-black outline-none focus:border-black"
            >
              <option value="" disabled>
                Select your skincare concern
              </option>
              <option value="acne">Acne and breakouts</option>
              <option value="pigmentation">Pigmentation and dark spots</option>
              <option value="sensitive-skin">Sensitive skin</option>
              <option value="aging">Fine lines and aging</option>
              <option value="routine">Product selection or skincare routine</option>
              <option value="other">Other concern</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-black"
            >
              Your question
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Tell us briefly what you'd like guidance on..."
              className="w-full resize-y border border-[#e5e0d9] bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
            />
          </div>
          <div>
  <label
    htmlFor="preferredTime"
    className="mb-2 block text-sm font-medium text-black"
  >
    What time is convenient for you?
  </label>

  <select
    id="preferredTime"
    name="preferredTime"
    required
    defaultValue=""
    className="w-full border border-[#e5e0d9] bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
  >
    <option value="" disabled>
      Select your preferred consultation time
    </option>
    <option value="morning">Morning (9 AM – 12 PM)</option>
    <option value="afternoon">Afternoon (12 PM – 4 PM)</option>
    <option value="evening">Evening (4 PM – 8 PM)</option>
    <option value="anytime">Any time is convenient</option>
  </select>

  <p className="mt-2 text-xs leading-5 text-[#81776e]">
    We’ll try our best to arrange your consultation at your preferred time.
  </p>
</div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-[#40372f]"
          >
            Request Consultation
            <span aria-hidden="true">↗</span>
          </button>

          <p className="text-xs leading-5 text-[#81776e]">
            Please avoid including sensitive medical information in this form.
          </p>
        </form>
      </div>
    </main>
  )
}
