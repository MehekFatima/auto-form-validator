[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

# auto-form-validator

A smart, zero-setup form validation library for React with automatic rule detection, async support, i18n, and UI integration helpers.

---

## Features

- 🧠 **Smart Defaults:** Automatically detects validation rules from HTML attributes like `required`, `type`, `minLength`, and more — no need for verbose schemas.  
- ⚙️ **Flexible Validation:** Supports both inline JSON schema and automatic rule detection from your markup.  
- 🔄 **Async Validation:** Easily add asynchronous rules such as API checks (e.g., username availability).  
- 🌐 **i18n Support:** Built-in multi-language error messages, making it easy to internationalize your forms.  
- 💅 **UI Helpers:** React hooks and components to simplify error handling and display.  
- 🚀 **Zero Setup:** Get started quickly without writing long Yup or Zod schemas.

---

## Why auto-form-validator?

Traditional validators like Yup or Zod require explicit schema definitions and can add boilerplate, especially for simple forms or dynamic validation needs. Here’s how **auto-form-validator** stands out:

| Feature                 | auto-form-validator                     | Existing Validators (Yup, Zod, Validator.js)       |
|-------------------------|---------------------------------------|----------------------------------------------------|
| **Setup**               | Zero-config rule detection + schemas  | Mostly manual, schema-first                         |
| **Smart Defaults**      | Auto-detects from HTML attributes     | None                                               |
| **Async Validation**    | Built-in support for async API rules  | Limited, often complex                             |
| **i18n Support**        | Multi-language errors included         | Usually requires separate setup                    |
| **UI Integration**      | React hooks + error display helpers    | External integrations required                      |
| **Bundle Size & Speed** | Lightweight, React-optimized            | Bulkier, generic                                   |

---

## How It Works

- **Define** an optional validation schema or rely on auto-detected HTML attribute rules.  
- **Use** the `useAutoValidator` React hook to register inputs, validate on change or blur, and validate the entire form on submit.  
- **Access** real-time error messages and form validity status through the hook’s API.  
- **Extend** with async rules and internationalized error messages easily.

---

## Quick Example

```tsx
import React from "react";
import { useAutoValidator } from "auto-form-validator";

const schema = {
  username: { required: true, minLength: 3 },
  email: { required: true, pattern: /^[\w.-]+@[\w.-]+\.\w+$/ },
};

export default function SignupForm() {
  const { register, errors, validateForm } = useAutoValidator(schema);

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {
      username: e.target.username.value,
      email: e.target.email.value,
    };
    if (validateForm(values)) {
      alert("Form valid! Submit logic here.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input {...register("username")} placeholder="Username" />
      <p>{errors.username}</p>

      <input {...register("email")} placeholder="Email" />
      <p>{errors.email}</p>

      <button type="submit">Register</button>
    </form>
  );
}
```
Real-World Benefits
-------------------

*   **Less boilerplate:** No need to write long Yup/Zod schemas unless you want to.
    
*   **Faster dev experience:** Auto-detection reduces setup time.
    
*   **Async & complex validation:** Easily add API-backed validations (e.g., username availability).

    
*   **React-friendly:** Designed as hooks and UI helpers for React apps.

Contributing & Feedback
-----------------------

Contributions are welcome! Feel free to open issues or PRs. Your feedback helps improve the package.