/* ============================================================
   ConnectGood — Application Logic
   NGO Volunteer Coordination Platform
   ============================================================ */

const app = (() => {
  "use strict";

  // ================================================================
  // CONFIGURATION
  // ================================================================
  const GEMINI_API_KEY = "YOUR_API_KEY_HERE";

  // ================================================================
  // DATA MANAGEMENT LAYER
  // ================================================================

  const CATEGORIES = [
    "Medical",
    "Education",
    "Relief",
    "Environment",
    "Food & Nutrition",
    "Shelter",
    "Community",
    "Animal Welfare",
  ];

  const CATEGORY_ICONS = {
    Medical: "🏥",
    Education: "📚",
    Relief: "🆘",
    Environment: "🌱",
    "Food & Nutrition": "🍲",
    Shelter: "🏠",
    Community: "🤝",
    "Animal Welfare": "🐾",
  };

  // ---- Sample Volunteer Tasks (with categories + geo) ----
  const sampleTasks = [
    {
      id: 1,
      title: "Community Garden Restoration",
      location: "Sanjay Gandhi National Park, Mumbai",
      category: "Environment",
      lat: 19.2288,
      lng: 72.9182,
      skills: ["Gardening", "Landscaping", "Heavy Lifting"],
      urgency: "critical",
      date: "2026-04-26",
      description: "Help restore the community garden that serves 200+ families. We need volunteers to clear overgrown areas, plant new seedlings, and repair raised beds.",
      volunteers: 3,
      needed: 8,
    },
    {
      id: 2,
      title: "After-School Tutoring Program",
      location: "Koramangala, Bangalore",
      category: "Education",
      lat: 12.9352,
      lng: 77.6245,
      skills: ["Teaching", "Math", "English"],
      urgency: "high",
      date: "2026-04-28",
      description: "Provide academic support for underserved students in grades 4-8. Focus areas include math fundamentals and reading comprehension.",
      volunteers: 5,
      needed: 10,
    },
    {
      id: 3,
      title: "Senior Meal Delivery",
      location: "T Nagar, Chennai",
      category: "Food & Nutrition",
      lat: 13.0405,
      lng: 80.2337,
      skills: ["Driving", "Communication"],
      urgency: "moderate",
      date: "2026-04-30",
      description: "Deliver prepared meals to homebound seniors in the downtown area. Each route takes approximately 2 hours and covers 10-12 deliveries.",
      volunteers: 7,
      needed: 12,
    },
    {
      id: 4,
      title: "Homeless Shelter Weekend Staff",
      location: "Park Street, Kolkata",
      category: "Shelter",
      lat: 22.5535,
      lng: 88.3510,
      skills: ["Cooking", "First Aid", "Communication"],
      urgency: "critical",
      date: "2026-04-25",
      description: "Weekend staff needed to help serve meals, organize donated clothing, and provide basic support services for shelter residents.",
      volunteers: 2,
      needed: 6,
    },
    {
      id: 5,
      title: "River Cleanup Drive",
      location: "Ghats of Varanasi",
      category: "Environment",
      lat: 25.3176,
      lng: 83.0062,
      skills: ["Physical Fitness", "Teamwork"],
      urgency: "low",
      date: "2026-05-03",
      description: "Join our monthly river cleanup effort! Help remove litter and debris from the riverbank trail. Equipment and refreshments provided.",
      volunteers: 15,
      needed: 25,
    },
    {
      id: 6,
      title: "Free Health Camp Setup",
      location: "Banjara Hills, Hyderabad",
      category: "Medical",
      lat: 17.4156,
      lng: 78.4347,
      skills: ["Medical", "Nursing", "Organization"],
      urgency: "high",
      date: "2026-04-27",
      description: "Assist in setting up and running a free health screening camp for underserved communities. Roles include patient registration, vitals checking, etc.",
      volunteers: 4,
      needed: 15,
    },
    {
      id: 7,
      title: "Digital Literacy Workshop",
      location: "Sector 17, Chandigarh",
      category: "Education",
      lat: 30.7383,
      lng: 76.7827,
      skills: ["Technology", "Teaching", "Patience"],
      urgency: "moderate",
      date: "2026-05-01",
      description: "Teach basic computer skills to adults and seniors including email, web browsing, and online safety. No prior teaching experience required.",
      volunteers: 2,
      needed: 5,
    },
    {
      id: 8,
      title: "Animal Shelter Volunteer Day",
      location: "Kothrud, Pune",
      category: "Animal Welfare",
      lat: 18.5074,
      lng: 73.8077,
      skills: ["Animal Care", "Cleaning"],
      urgency: "low",
      date: "2026-05-05",
      description: "Help care for rescued animals by cleaning kennels, walking dogs, socializing cats, and assisting with adoption events.",
      volunteers: 10,
      needed: 15,
    },
  ];

  // ---- Admin Posted Needs (with categories + geo) ----
  let postedNeeds = [
    {
      id: 101,
      title: "Emergency Food Distribution",
      location: "Connaught Place, Delhi",
      category: "Relief",
      lat: 28.6304,
      lng: 77.2177,
      skills: ["Logistics", "Driving"],
      urgency: "critical",
      date: "2026-04-25",
      description: "Urgent food distribution to flood-affected areas.",
    },
    {
      id: 102,
      title: "Youth Mentorship Program",
      location: "Vastrapur, Ahmedabad",
      category: "Education",
      lat: 23.0350,
      lng: 72.5293,
      skills: ["Mentoring", "Counseling"],
      urgency: "moderate",
      date: "2026-05-01",
      description: "Ongoing mentorship for at-risk youth.",
    },
    {
      id: 103,
      title: "Clothing Drive Collection",
      location: "MG Road, Kochi",
      category: "Community",
      lat: 9.9712,
      lng: 76.2829,
      skills: ["Organization", "Sorting"],
      urgency: "low",
      date: "2026-05-10",
      description: "Seasonal clothing drive for families in need.",
    },
    {
      id: 104,
      title: "Disaster First-Aid Training",
      location: "MI Road, Jaipur",
      category: "Medical",
      lat: 26.9157,
      lng: 75.8013,
      skills: ["First Aid", "CPR"],
      urgency: "high",
      date: "2026-04-29",
      description: "Train community members in basic disaster first-aid.",
    },
    {
      id: 105,
      title: "Park Accessibility Improvements",
      location: "Civil Lines, Nagpur",
      category: "Community",
      lat: 21.1528,
      lng: 79.0669,
      skills: ["Construction", "Painting"],
      urgency: "moderate",
      date: "2026-05-08",
      description: "Make park pathways accessible for wheelchairs and strollers.",
    },
  ];

  // ---- Volunteer Profiles (data store) ----
  let volunteerProfiles = [];

  async function fetchVolunteers() {
    try {
      const snapshot = await db.collection("volunteers").get();
      const profiles = [];
      snapshot.forEach((doc) => {
        profiles.push({ id: doc.id, ...doc.data() });
      });
      volunteerProfiles = profiles;
      console.log(`Fetched ${volunteerProfiles.length} volunteers from Firebase.`);
    } catch (err) {
      console.error("Error fetching volunteers:", err);
    }
  }


  // Current user's volunteer profile
  let currentVolunteerProfile = null;

  let currentFilter = "all";
  let currentManageCategoryFilter = "all";
  let needIdCounter = 106;

  // ================================================================
  // UTILITY FUNCTIONS
  // ================================================================

  function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }

  function formatDate(dateStr) {
    if (!dateStr) return "Flexible";
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function getUrgencyLabel(urgency) {
    const labels = {
      critical: "🔴 Critical",
      high: "🟠 High",
      moderate: "🟡 Moderate",
      low: "🟢 Low",
    };
    return labels[urgency] || urgency;
  }

  function getCategoryBadge(cat) {
    return `${CATEGORY_ICONS[cat] || "📋"} ${cat}`;
  }

  /** Calculate skill overlap between a volunteer and a need */
  function getSkillMatch(volunteerSkills, needSkills) {
    const vSet = new Set(volunteerSkills.map((s) => s.toLowerCase()));
    const matched = needSkills.filter((s) => vSet.has(s.toLowerCase()));
    return {
      matched,
      total: needSkills.length,
      percent:
        needSkills.length > 0
          ? Math.round((matched.length / needSkills.length) * 100)
          : 0,
    };
  }

  // ================================================================
  // SCREEN NAVIGATION
  // ================================================================

  function selectRole(role) {
    document.getElementById("role-screen").classList.remove("active");
    if (role === "volunteer") {
      document.getElementById("volunteer-screen").classList.add("active");
      switchVolunteerView("home");
      updateGreeting();
    } else if (role === "admin") {
      document.getElementById("admin-screen").classList.add("active");
      renderManageList();
    }
    announceToSR(
      `Navigated to ${role === "volunteer" ? "Volunteer" : "NGO Admin"} Dashboard`,
    );
  }

  function goBack() {
    document.getElementById("volunteer-screen").classList.remove("active");
    document.getElementById("admin-screen").classList.remove("active");
    document.getElementById("role-screen").classList.add("active");
    announceToSR("Returned to role selection");
  }

  function updateGreeting() {
    const greetEl = document.querySelector("#vol-home-view .welcome-greeting");
    if (greetEl) greetEl.textContent = `${getTimeOfDay()} 👋`;
  }

  // ================================================================
  // VOLUNTEER VIEW SWITCHING (Home / Profile)
  // ================================================================

  function switchVolunteerView(view) {
    document
      .querySelectorAll(".vol-view")
      .forEach((v) => v.classList.remove("active"));
    document
      .querySelectorAll("#vol-bottom-nav .bottom-nav-item")
      .forEach((b) => {
        b.classList.remove("active");
        b.removeAttribute("aria-current");
      });
    if (view === "home") {
      document.getElementById("vol-home-view").classList.add("active");
      document.getElementById("bnav-home").classList.add("active");
      document.getElementById("bnav-home").setAttribute("aria-current", "page");
      renderTasks();
    } else if (view === "profile") {
      document.getElementById("vol-profile-view").classList.add("active");
      document.getElementById("bnav-profile").classList.add("active");
      document
        .getElementById("bnav-profile")
        .setAttribute("aria-current", "page");
      populateProfileForm();
    }
    announceToSR(`Switched to ${view} view`);
  }

  // ================================================================
  // VOLUNTEER PROFILE
  // ================================================================

  function populateProfileForm() {
    if (!currentVolunteerProfile) return;
    const p = currentVolunteerProfile;
    document.getElementById("prof-fname").value = p.firstName || "";
    document.getElementById("prof-lname").value = p.lastName || "";
    document.getElementById("prof-email").value = p.email || "";
    document.getElementById("prof-zip").value = p.zip || "";
    document.getElementById("prof-skills").value = (p.skills || []).join(", ");
    document.getElementById("prof-hours").value = p.hours || "5-10";
    document.getElementById("prof-bio").value = p.bio || "";
    // Availability checkboxes
    document
      .querySelectorAll('#profile-form input[name="avail"]')
      .forEach((cb) => {
        cb.checked = (p.availability || []).includes(cb.value);
      });
  }

  async function saveProfile(e) {
    e.preventDefault();
    const firstName = document.getElementById("prof-fname").value.trim();
    const lastName = document.getElementById("prof-lname").value.trim();
    const email = document.getElementById("prof-email").value.trim();
    const zip = document.getElementById("prof-zip").value.trim();
    const skillsRaw = document.getElementById("prof-skills").value.trim();
    const hours = document.getElementById("prof-hours").value;
    const bio = document.getElementById("prof-bio").value.trim();
    const availability = Array.from(
      document.querySelectorAll('#profile-form input[name="avail"]:checked'),
    ).map((cb) => cb.value);

    // Validate
    let valid = true;
    valid =
      validateField(
        "prof-fname",
        "err-prof-fname",
        firstName,
        "First name is required.",
      ) && valid;
    valid =
      validateField(
        "prof-lname",
        "err-prof-lname",
        lastName,
        "Last name is required.",
      ) && valid;
    valid =
      validateField("prof-zip", "err-prof-zip", zip, "Zip code is required.") &&
      valid;
    valid =
      validateField(
        "prof-skills",
        "err-prof-skills",
        skillsRaw,
        "Please enter at least one skill.",
      ) && valid;
    if (availability.length === 0) {
      document.getElementById("err-prof-avail").textContent =
        "Select at least one day.";
      document.getElementById("err-prof-avail").classList.add("visible");
      valid = false;
    } else {
      document.getElementById("err-prof-avail").textContent = "";
      document.getElementById("err-prof-avail").classList.remove("visible");
    }

    if (!valid) {
      announceToSR("Profile form has errors.");
      return;
    }

    const skills = skillsRaw
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    const profile = {
      firstName,
      lastName,
      email,
      zip,
      skills,
      availability,
      hours,
      bio,
    };

    const btn = document.getElementById("btn-save-profile");
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span class="ai-spinner"></span> Saving...`;
    }

    try {
      if (currentVolunteerProfile && currentVolunteerProfile.id && currentVolunteerProfile.id !== "v-user") {
        await db.collection("volunteers").doc(currentVolunteerProfile.id).update(profile);
        profile.id = currentVolunteerProfile.id;
      } else {
        const docRef = await db.collection("volunteers").add(profile);
        profile.id = docRef.id;
      }

      // Update or add to the profiles store
      const existingIdx = volunteerProfiles.findIndex((v) => v.id === profile.id);
      if (existingIdx >= 0) {
        volunteerProfiles[existingIdx] = profile;
      } else {
        volunteerProfiles.push(profile);
      }
      currentVolunteerProfile = profile;

      // Update UI
      document.getElementById("profile-avatar-display").textContent =
        `${firstName[0]}${lastName[0]}`.toUpperCase();
      document.getElementById("profile-display-name").textContent =
        `${firstName} ${lastName}`;
      document.querySelector("#vol-avatar-btn span").textContent =
        `${firstName[0]}${lastName[0]}`.toUpperCase();

      showToast(`Profile saved! You can now be matched to tasks.`, "success");
      announceToSR("Volunteer profile saved successfully.");
    } catch (err) {
      console.error("Error saving profile to Firebase:", err);
      showToast("Error saving profile to database.", "error");
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true"><path d="M7 13l-4-4 1.4-1.4L7 10.2l6.6-6.6L15 5l-8 8z"/></svg> Save Profile`;
      }
    }
  }

  // ================================================================
  // VOLUNTEER: TASK RENDERING
  // ================================================================

  function renderTasks() {
    const grid = document.getElementById("task-grid");
    if (!grid) return;
    const filtered =
      currentFilter === "all"
        ? sampleTasks
        : sampleTasks.filter((t) => t.urgency === currentFilter);

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 48px 24px; color: var(--clr-text-muted);">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="currentColor" opacity="0.3" style="margin-bottom:16px;"><circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="2" fill="none"/><path d="M22 38c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="24" cy="26" r="3"/><circle cx="40" cy="26" r="3"/></svg>
                <p style="font-size:1rem;font-weight:600;margin-bottom:4px;">No tasks found</p>
                <p style="font-size:0.875rem;">Try adjusting your filters to see more opportunities.</p>
            </div>`;
      return;
    }

    grid.innerHTML = filtered
      .map(
        (task, index) => `
            <article class="task-card" role="listitem" tabindex="0"
                     style="animation-delay: ${index * 60}ms"
                     onclick="app.openTaskDetail(${task.id})"
                     onkeydown="if(event.key === 'Enter') app.openTaskDetail(${task.id})"
                     aria-label="${task.title}. Urgency: ${task.urgency}. Location: ${task.location}">
                <div class="task-card-urgency-bar ${task.urgency}"></div>
                <div class="task-card-header">
                    <h3 class="task-card-title">${task.title}</h3>
                    <span class="urgency-badge ${task.urgency}">${getUrgencyLabel(task.urgency)}</span>
                </div>
                <div class="task-card-meta-row">
                    <span class="category-badge cat-${task.category.replace(/[^a-zA-Z]/g, "")}">${getCategoryBadge(task.category)}</span>
                </div>
                <div class="task-card-location">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M7 1C4.24 1 2 3.24 2 6c0 3.5 5 7 5 7s5-3.5 5-7c0-2.76-2.24-5-5-5zm0 6.8A1.8 1.8 0 117 4.4a1.8 1.8 0 010 3.6z"/></svg>
                    ${task.location}
                    ${task.lat ? `<span class="geo-coords">(${task.lat.toFixed(4)}, ${task.lng.toFixed(4)})</span>` : ""}
                </div>
                <div class="task-card-skills">
                    ${task.skills.map((s) => `<span class="skill-tag">${s}</span>`).join("")}
                </div>
                <div class="task-card-footer">
                    <span class="task-card-date">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" opacity="0.5"><path d="M11 2h-.5V.5h-1V2h-5V.5h-1V2H3C2.17 2 1.5 2.67 1.5 3.5v8c0 .83.67 1.5 1.5 1.5h8c.83 0 1.5-.67 1.5-1.5v-8c0-.83-.67-1.5-1.5-1.5zm0 9.5H3V5.5h8v6z"/></svg>
                        ${formatDate(task.date)}
                    </span>
                    <span class="task-card-action" role="button" tabindex="-1">View Details</span>
                </div>
            </article>
        `,
      )
      .join("");
  }

  function filterTasks(filter) {
    currentFilter = filter;
    document
      .querySelectorAll("#vol-tasks-header .filter-chip")
      .forEach((chip) => {
        chip.classList.remove("active");
        chip.setAttribute("aria-pressed", "false");
      });
    const activeChip = document.getElementById(
      `filter-${filter === "critical" ? "urgent" : filter}`,
    );
    if (activeChip) {
      activeChip.classList.add("active");
      activeChip.setAttribute("aria-pressed", "true");
    }
    renderTasks();
    announceToSR(`Showing ${filter === "all" ? "all" : filter} priority tasks`);
  }

  // ================================================================
  // VOLUNTEER: TASK DETAIL MODAL
  // ================================================================

  function openTaskDetail(taskId) {
    const task = sampleTasks.find((t) => t.id === taskId);
    if (!task) return;
    const overlay = document.getElementById("modal-overlay");
    const body = document.getElementById("modal-body");
    body.innerHTML = `
            <div class="modal-urgency-banner ${task.urgency}"></div>
            <div style="padding: var(--space-xl);">
                <h2 id="modal-title" class="modal-task-title">${task.title}</h2>
                <div class="modal-meta">
                    <div class="modal-meta-item"><span class="category-badge cat-${task.category.replace(/[^a-zA-Z]/g, "")}">${getCategoryBadge(task.category)}</span></div>
                    <div class="modal-meta-item">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M9 1C5.7 1 3 3.7 3 7c0 4.5 6 10 6 10s6-5.5 6-10c0-3.3-2.7-6-6-6zm0 8.5A2.5 2.5 0 119 4.5a2.5 2.5 0 010 5z"/></svg>
                        <span>${task.location}</span>
                    </div>
                    ${task.lat ? `<div class="modal-meta-item"><svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" opacity="0.5"><circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M9 2v14M2 9h14" stroke="currentColor" stroke-width="1"/></svg><span class="geo-coords-modal">${task.lat.toFixed(4)}°N, ${task.lng.toFixed(4)}°E</span></div>` : ""}
                    <div class="modal-meta-item">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M14 2h-.7V.5h-1.3V2H6V.5H4.7V2H4c-.8 0-1.3.6-1.3 1.3v10.5c0 .7.6 1.2 1.3 1.2h10c.7 0 1.3-.5 1.3-1.2V3.3C15.3 2.6 14.7 2 14 2zm0 11.8H4V6h10v7.8z"/></svg>
                        <span>${formatDate(task.date)}</span>
                    </div>
                    <div class="modal-meta-item">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M12 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6 0c1.1 0 2-.9 2-2S7.1 5 6 5 4 5.9 4 7s.9 2 2 2zm0 1.5C4 10.5 0 11.6 0 13.5V15h12v-1.5c0-1.9-4-3-6-3zm6 0c-.2 0-.5 0-.8.1.9.7 1.5 1.6 1.5 2.9V15h5v-1.5c0-1.9-3.8-3-5.7-3z"/></svg>
                        <span>${task.volunteers}/${task.needed} volunteers signed up</span>
                    </div>
                    <div class="modal-meta-item"><span class="urgency-badge ${task.urgency}" style="margin-left:-2px;">${getUrgencyLabel(task.urgency)}</span></div>
                </div>
                <p class="modal-description">${task.description}</p>
                <div class="modal-skills-section"><h4>Required Skills</h4>
                    <div class="modal-skills-list">${task.skills.map((s) => `<span class="skill-tag">${s}</span>`).join("")}</div>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-secondary" onclick="app.closeModal()">Maybe Later</button>
                    <button class="btn btn-primary" onclick="app.volunteerForTask(${task.id})">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M7 13l-4-4 1.4-1.4L7 10.2l6.6-6.6L15 5l-8 8z"/></svg>
                        Volunteer Now
                    </button>
                </div>
            </div>`;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("modal-close-btn").focus();
    overlay.addEventListener("keydown", handleModalKeydown);
    overlay.addEventListener("click", handleOverlayClick);
  }

  function closeModal() {
    const overlay = document.getElementById("modal-overlay");
    overlay.hidden = true;
    document.body.style.overflow = "";
    overlay.removeEventListener("keydown", handleModalKeydown);
    overlay.removeEventListener("click", handleOverlayClick);
  }
  function handleModalKeydown(e) {
    if (e.key === "Escape") closeModal();
  }
  function handleOverlayClick(e) {
    if (e.target.id === "modal-overlay") closeModal();
  }

  function volunteerForTask(taskId) {
    const task = sampleTasks.find((t) => t.id === taskId);
    if (task && task.volunteers < task.needed) task.volunteers++;
    closeModal();
    showToast(
      `You've signed up for "${task ? task.title : "the task"}"! 🎉`,
      "success",
    );
    renderTasks();
  }

  // ================================================================
  // ADMIN: TAB SWITCHING
  // ================================================================

  function switchAdminTab(tab) {
    document.querySelectorAll(".admin-tab").forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    document
      .querySelectorAll(".admin-panel")
      .forEach((p) => p.classList.remove("active"));

    if (tab === "post") {
      document.getElementById("tab-post-need").classList.add("active");
      document
        .getElementById("tab-post-need")
        .setAttribute("aria-selected", "true");
      document.getElementById("panel-post").classList.add("active");
    } else if (tab === "manage") {
      document.getElementById("tab-manage").classList.add("active");
      document
        .getElementById("tab-manage")
        .setAttribute("aria-selected", "true");
      document.getElementById("panel-manage").classList.add("active");
      renderManageList();
    } else if (tab === "matching") {
      document.getElementById("tab-matching").classList.add("active");
      document
        .getElementById("tab-matching")
        .setAttribute("aria-selected", "true");
      document.getElementById("panel-matching").classList.add("active");
      populateMatchingSelect();
      renderMatchingView();
    }
  }

  // ================================================================
  // ADMIN: NEEDS HEATMAP
  // ================================================================

  const HEATMAP_REGIONS = [
    "Downtown",
    "Riverside",
    "Sector 14",
    "West End",
    "Old Town",
    "University Area",
    "Industrial Zone",
    "Green Valley",
    "Lakeside",
    "Market District",
    "East Ridge",
    "Hillside",
    "Central Hub",
    "South Bay",
    "Tech Park",
    "Garden District",
    "Port Area",
    "Midtown",
    "Heritage Quarter",
    "New Colony",
    "North Gate",
    "Station Road",
    "Civic Center",
    "Palm Grove",
  ];

  function renderHeatmap() {
    const grid = document.getElementById("heatmap-grid");
    if (!grid) return;

    // Merge sample tasks + posted needs for heatmap data
    const allNeeds = [...sampleTasks, ...postedNeeds];
    const urgencyOrder = ["low", "moderate", "high", "critical"];
    const urgencyColors = {
      low: { bg: "rgba(34,197,94,VAL)", border: "#22C55E" },
      moderate: { bg: "rgba(234,179,8,VAL)", border: "#EAB308" },
      high: { bg: "rgba(249,115,22,VAL)", border: "#F97316" },
      critical: { bg: "rgba(239,68,68,VAL)", border: "#EF4444" },
    };

    // Create cells: map needs to regions, fill remaining with random data
    const cells = [];
    HEATMAP_REGIONS.forEach((region, i) => {
      const matchedNeed = allNeeds[i % allNeeds.length];
      const urgency = matchedNeed
        ? matchedNeed.urgency
        : urgencyOrder[Math.floor(Math.random() * 4)];
      const intensity = 0.15 + Math.random() * 0.65;
      const demandLevel = Math.ceil(Math.random() * 5);
      const volCount = Math.floor(Math.random() * 12) + 1;
      const needCount = Math.floor(Math.random() * 6) + 1;
      const title = matchedNeed
        ? matchedNeed.title
        : `${region} Community Need`;
      const cat = matchedNeed
        ? matchedNeed.category
        : CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
      cells.push({
        region,
        urgency,
        intensity,
        demandLevel,
        volCount,
        needCount,
        title,
        category: cat,
      });
    });

    grid.innerHTML = cells
      .map((cell, idx) => {
        const colors = urgencyColors[cell.urgency];
        const bgColor = colors.bg.replace("VAL", cell.intensity.toFixed(2));
        const scale = 0.7 + (cell.demandLevel / 5) * 0.3;
        return `<div class="heatmap-cell" tabindex="0"
                style="background: ${bgColor}; border-color: ${colors.border}; transform: scale(${scale});"
                data-idx="${idx}"
                aria-label="${cell.region}: ${cell.urgency} urgency, ${cell.needCount} needs, ${cell.volCount} volunteers"
                onmouseenter="app.showHeatmapTooltip(event, ${idx})"
                onmouseleave="app.hideHeatmapTooltip()"
                onfocus="app.showHeatmapTooltip(event, ${idx})"
                onblur="app.hideHeatmapTooltip()">
                <span class="heatmap-cell-region">${cell.region}</span>
                <span class="heatmap-cell-count">${cell.needCount}</span>
            </div>`;
      })
      .join("");

    // Store cell data for tooltip
    grid._cellData = cells;
  }

  function showHeatmapTooltip(event, idx) {
    const grid = document.getElementById("heatmap-grid");
    const tooltip = document.getElementById("heatmap-tooltip");
    if (!grid || !grid._cellData || !grid._cellData[idx]) return;
    const cell = grid._cellData[idx];
    document.getElementById("heatmap-tooltip-title").textContent =
      `${cell.region}`;
    document.getElementById("heatmap-tooltip-meta").innerHTML =
      `<span>${CATEGORY_ICONS[cell.category] || "📋"} ${cell.category}</span>
             <span>Urgency: <strong>${cell.urgency.charAt(0).toUpperCase() + cell.urgency.slice(1)}</strong></span>
             <span>${cell.needCount} needs · ${cell.volCount} volunteers</span>`;
    tooltip.hidden = false;
    // Position near cell
    const rect = event.target.closest(".heatmap-cell").getBoundingClientRect();
    const containerRect = document
      .getElementById("heatmap-container")
      .getBoundingClientRect();
    tooltip.style.left =
      Math.min(
        rect.left - containerRect.left + rect.width / 2,
        containerRect.width - 200,
      ) + "px";
    tooltip.style.top = rect.top - containerRect.top - 60 + "px";
  }

  function hideHeatmapTooltip() {
    document.getElementById("heatmap-tooltip").hidden = true;
  }

  // ================================================================
  // ADMIN: AI MATCHMAKER
  // ================================================================

  let aiMatchmakerRunning = false;

  async function runAIMatchmaker() {
    if (aiMatchmakerRunning) return;
    aiMatchmakerRunning = true;

    const btn = document.getElementById("btn-ai-matchmaker");
    const results = document.getElementById("ai-results");

    // Show loading state
    btn.disabled = true;
    btn.innerHTML = `<span class="ai-spinner"></span> Analyzing profiles with Gemini AI…`;
    btn.classList.add("loading");
    results.hidden = false;
    results.innerHTML = `<div class="ai-loading-display">
            <div class="ai-loading-bar"><div class="ai-loading-fill" style="animation: loading-bar 5s ease-in-out infinite;"></div></div>
            <p class="ai-loading-text">🤖 Gemini is scanning <strong>${volunteerProfiles.length}</strong> volunteer profiles against <strong>${postedNeeds.length}</strong> community needs…</p>
        </div>`;

    if (GEMINI_API_KEY === "YOUR_API_KEY_HERE" || !GEMINI_API_KEY) {
      results.innerHTML = `<div style="color:var(--clr-danger); padding:16px; border:1px solid var(--clr-danger); border-radius:8px; margin-top:16px;">
        ⚠️ <strong>API Key Missing:</strong> Please update GEMINI_API_KEY in app.js to use the AI Matchmaker.
      </div>`;
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true"><path d="M7 13l-4-4 1.4-1.4L7 10.2l6.6-6.6L15 5l-8 8z"/></svg> Run AI Matchmaker`;
      btn.disabled = false;
      btn.classList.remove("loading");
      aiMatchmakerRunning = false;
      return;
    }

    try {
      const prompt = `
        You are an AI Matchmaker for an NGO volunteer platform.
        You have a list of Community Needs and a list of Volunteer Profiles.
        Your goal is to find the best single volunteer for each Community Need based on skills overlap, availability, and location proximity.
        
        Community Needs:
        ${JSON.stringify(postedNeeds.map(n => ({ id: n.id, title: n.title, skills: n.skills, location: n.location, urgency: n.urgency })), null, 2)}
        
        Volunteer Profiles:
        ${JSON.stringify(volunteerProfiles.map(v => ({ id: v.id, name: v.firstName + " " + v.lastName, skills: v.skills, zip: v.zip })), null, 2)}
        
        Return a JSON array of pairings. Each pairing should look exactly like this:
        {
          "needId": 101,
          "volunteerId": "v1",
          "confidence": 95,
          "matchedSkills": ["Skill 1", "Skill 2"]
        }
        Return ONLY valid JSON. Return an empty array if no matches make sense. Ensure every need gets paired if possible.
      `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API Error: ${response.status}`);
      }

      const data = await response.json();
      let pairingsData = [];
      try {
        const textResponse = data.candidates[0].content.parts[0].text;
        pairingsData = JSON.parse(textResponse);
      } catch (e) {
        console.error("Error parsing Gemini JSON response:", e);
        throw new Error("Invalid response format from Gemini");
      }

      const pairings = pairingsData.map(p => {
        const need = postedNeeds.find(n => n.id === p.needId);
        const volunteer = volunteerProfiles.find(v => v.id === p.volunteerId);
        return { need, volunteer, confidence: p.confidence, matchedSkills: p.matchedSkills };
      }).filter(p => p.need); // Only keep valid pairings

      results.innerHTML = `
                <div class="ai-results-header">
                    <h4>✨ Gemini AI Match Results</h4>
                    <span class="ai-results-count">${pairings.length} pairings found</span>
                </div>
                <div class="ai-results-list">
                    ${pairings
                      .map(
                        (p, i) => `
                        <div class="ai-result-card" style="animation-delay: ${i * 80}ms">
                            <div class="ai-result-confidence">
                                <svg class="ai-conf-ring" width="56" height="56" viewBox="0 0 56 56">
                                    <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" stroke-width="4" opacity="0.12"/>
                                    <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" stroke-width="4"
                                        stroke-dasharray="${(p.confidence / 100) * 150.8} 150.8"
                                        stroke-linecap="round" transform="rotate(-90 28 28)"
                                        style="color: ${p.confidence >= 80 ? "#22C55E" : p.confidence >= 50 ? "#EAB308" : "#F97316"}"/>
                                </svg>
                                <span class="ai-conf-pct">${p.confidence}%</span>
                            </div>
                            <div class="ai-result-body">
                                <div class="ai-result-need-name">
                                    <span class="category-badge-sm cat-${(p.need.category || "").replace(/[^a-zA-Z]/g, "")}">${getCategoryBadge(p.need.category)}</span>
                                    ${p.need.title}
                                </div>
                                <div class="ai-result-arrow" aria-hidden="true">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" opacity="0.3"><path d="M4 10h12M12 6l4 4-4 4"/></svg>
                                </div>
                                <div class="ai-result-vol-name">
                                    <span class="ai-result-vol-avatar">${p.volunteer && p.volunteer.firstName ? p.volunteer.firstName[0] + p.volunteer.lastName[0] : "??"}</span>
                                    ${p.volunteer ? p.volunteer.firstName + " " + p.volunteer.lastName : "No match"}
                                </div>
                            </div>
                            <div class="ai-result-skills">
                                ${p.matchedSkills.map((s) => `<span class="skill-tag skill-matched">✓ ${s}</span>`).join("")}
                                ${p.matchedSkills.length === 0 ? '<span class="skill-tag">No skill overlap</span>' : ""}
                            </div>
                            <div class="ai-result-label">Match Confidence Score</div>
                        </div>
                    `
                      )
                      .join("")}
                </div>`;

      showToast(`Gemini Matchmaker complete! ${pairings.length} pairings generated.`, "success");
      announceToSR(`Gemini Matchmaker finished. ${pairings.length} volunteer-need pairings generated.`);
    } catch (error) {
      console.error(error);
      results.innerHTML = `<div style="color:var(--clr-danger); padding:16px; border:1px solid var(--clr-danger); border-radius:8px; margin-top:16px;">
        ⚠️ <strong>AI Matching Failed:</strong> ${error.message}
      </div>`;
      showToast("Error running Gemini AI.", "error");
    } finally {
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true"><path d="M7 13l-4-4 1.4-1.4L7 10.2l6.6-6.6L15 5l-8 8z"/></svg> Re-run AI Matchmaker`;
      btn.disabled = false;
      btn.classList.remove("loading");
      aiMatchmakerRunning = false;
    }
  }

  // ================================================================
  // CHAT WIDGET
  // ================================================================

  let chatOpen = false;

  const BOT_RESPONSES = [
    "Great question! You can find volunteer tasks on your Home dashboard. Filter by urgency to find what suits you best.",
    "Your profile helps us match you with the right opportunities. Make sure to update your skills and availability!",
    "The AI Matchmaker uses your skills and location to find the best pairings. Admins can run it from the Matching View tab.",
    "If you need to change your availability, head to the Profile section and update your days.",
    "Each task card shows the category, location with coordinates, required skills, and urgency level. Click 'View Details' for more info!",
    "We're always looking for volunteers with medical, teaching, and logistics skills. Check back often for new needs!",
    "You can track your completed tasks in the stats at the top of your dashboard. Keep up the great work! 🌟",
    "Need help with something specific? Try asking about tasks, profile setup, or how the matching system works.",
  ];

  function toggleChat() {
    chatOpen = !chatOpen;
    const panel = document.getElementById("chat-panel");
    const fab = document.getElementById("chat-fab");
    const badge = document.getElementById("chat-fab-badge");
    const openIcon = fab.querySelector(".chat-fab-open");
    const closeIcon = fab.querySelector(".chat-fab-close");

    if (chatOpen) {
      panel.hidden = false;
      fab.setAttribute("aria-expanded", "true");
      fab.setAttribute("aria-label", "Close support chat");
      openIcon.style.display = "none";
      closeIcon.style.display = "block";
      badge.style.display = "none";
      // Focus the input
      setTimeout(() => document.getElementById("chat-input").focus(), 200);
    } else {
      panel.hidden = true;
      fab.setAttribute("aria-expanded", "false");
      fab.setAttribute("aria-label", "Open support chat");
      openIcon.style.display = "block";
      closeIcon.style.display = "none";
    }
  }

  function sendChatMessage() {
    const input = document.getElementById("chat-input");
    const text = input.value.trim();
    if (!text) return;
    input.value = "";

    const messages = document.getElementById("chat-messages");
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // User message
    messages.innerHTML += `<div class="chat-message user">
            <div class="chat-msg-bubble"><p>${escapeHTML(text)}</p><span class="chat-msg-time">${timeStr}</span></div>
        </div>`;
    messages.scrollTop = messages.scrollHeight;

    // Bot typing indicator
    const typingId = "typing-" + Date.now();
    messages.innerHTML += `<div class="chat-message bot" id="${typingId}">
            <div class="chat-msg-avatar" aria-hidden="true">CG</div>
            <div class="chat-msg-bubble"><div class="chat-typing"><span></span><span></span><span></span></div></div>
        </div>`;
    messages.scrollTop = messages.scrollHeight;

    // Simulate bot reply
    setTimeout(
      () => {
        const typingEl = document.getElementById(typingId);
        if (typingEl) typingEl.remove();
        const reply =
          BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
        messages.innerHTML += `<div class="chat-message bot">
                <div class="chat-msg-avatar" aria-hidden="true">CG</div>
                <div class="chat-msg-bubble"><p>${reply}</p><span class="chat-msg-time">${timeStr}</span></div>
            </div>`;
        messages.scrollTop = messages.scrollHeight;
      },
      1200 + Math.random() * 800,
    );
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // ================================================================
  // ADMIN: FORM SUBMISSION (with Category + Geo)
  // ================================================================

  function submitNeed(e) {
    e.preventDefault();
    const title = document.getElementById("need-title").value.trim();
    const category = document.getElementById("need-category").value;
    const location = document.getElementById("need-location").value.trim();
    const latVal = document.getElementById("need-lat").value.trim();
    const lngVal = document.getElementById("need-lng").value.trim();
    const skills = document.getElementById("need-skills").value.trim();
    const urgency = document.getElementById("need-urgency").value;
    const description = document.getElementById("need-desc").value.trim();
    const date = document.getElementById("need-date").value;

    let valid = true;
    valid =
      validateField(
        "need-title",
        "err-title",
        title,
        "Please enter a title for this need.",
      ) && valid;
    valid =
      validateField(
        "need-category",
        "err-category",
        category,
        "Please select a category.",
      ) && valid;
    valid =
      validateField(
        "need-location",
        "err-location",
        location,
        "Please enter a location.",
      ) && valid;
    valid =
      validateField(
        "need-skills",
        "err-skills",
        skills,
        "Please enter at least one required skill.",
      ) && valid;
    valid =
      validateField(
        "need-urgency",
        "err-urgency",
        urgency,
        "Please select an urgency level.",
      ) && valid;

    if (!valid) {
      announceToSR("Form has errors. Please correct them.");
      return;
    }

    const newNeed = {
      id: needIdCounter++,
      title,
      category,
      location,
      lat: latVal ? parseFloat(latVal) : null,
      lng: lngVal ? parseFloat(lngVal) : null,
      skills: skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      urgency,
      description: description || "No additional details provided.",
      date: date || null,
    };

    postedNeeds.unshift(newNeed);
    document.getElementById("admin-active-count").textContent =
      postedNeeds.length;
    document.getElementById("admin-stat-active-val").textContent =
      postedNeeds.length;
    document.getElementById("manage-count").textContent =
      `${postedNeeds.length} needs`;
    document.getElementById("need-form").reset();
    clearErrors();

    showToast(
      `"${title}" posted successfully! Volunteers can now see it.`,
      "success",
    );
    announceToSR(`Community need "${title}" has been created successfully.`);
    setTimeout(() => switchAdminTab("manage"), 800);
  }

  function validateField(inputId, errorId, value, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (!value) {
      input.classList.add("error");
      error.textContent = message;
      error.classList.add("visible");
      return false;
    } else {
      input.classList.remove("error");
      error.textContent = "";
      error.classList.remove("visible");
      return true;
    }
  }

  function clearErrors() {
    document
      .querySelectorAll(".form-input, .form-select")
      .forEach((el) => el.classList.remove("error"));
    document.querySelectorAll(".form-error").forEach((el) => {
      el.textContent = "";
      el.classList.remove("visible");
    });
  }

  // ================================================================
  // ADMIN: MANAGE LIST (with category filter)
  // ================================================================

  function filterManageList(cat) {
    currentManageCategoryFilter = cat;
    document
      .querySelectorAll("#category-filter-row .filter-chip")
      .forEach((chip) => {
        const isActive = chip.getAttribute("data-cat") === cat;
        chip.classList.toggle("active", isActive);
        chip.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    renderManageList();
  }

  function renderManageList() {
    const list = document.getElementById("manage-list");
    if (!list) return;

    const filtered =
      currentManageCategoryFilter === "all"
        ? postedNeeds
        : postedNeeds.filter((n) => n.category === currentManageCategoryFilter);
    document.getElementById("manage-count").textContent =
      `${filtered.length} need${filtered.length !== 1 ? "s" : ""}`;

    if (filtered.length === 0) {
      list.innerHTML = `<div style="text-align:center;padding:48px 24px;color:var(--clr-text-muted);"><p style="font-size:1rem;font-weight:600;margin-bottom:4px;">No needs found</p><p style="font-size:0.875rem;">Try a different category filter or post a new need.</p></div>`;
      return;
    }

    list.innerHTML = filtered
      .map(
        (need, index) => `
            <div class="manage-item" role="listitem" style="animation-delay: ${index * 50}ms">
                <div class="manage-item-urgency ${need.urgency}"></div>
                <div class="manage-item-info">
                    <div class="manage-item-title">${need.title}</div>
                    <div class="manage-item-meta">
                        <span class="category-badge-sm">${getCategoryBadge(need.category)}</span>
                        <span><svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor"><path d="M7 1C4.24 1 2 3.24 2 6c0 3.5 5 7 5 7s5-3.5 5-7c0-2.76-2.24-5-5-5zm0 6.8A1.8 1.8 0 117 4.4a1.8 1.8 0 010 3.6z"/></svg> ${need.location}${need.lat ? ` <span class="geo-coords-sm">(${need.lat.toFixed(2)}, ${need.lng.toFixed(2)})</span>` : ""}</span>
                        <span><svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor"><path d="M11 2h-.5V.5h-1V2h-5V.5h-1V2H3C2.17 2 1.5 2.67 1.5 3.5v8c0 .83.67 1.5 1.5 1.5h8c.83 0 1.5-.67 1.5-1.5v-8c0-.83-.67-1.5-1.5-1.5zm0 9.5H3V5.5h8v6z"/></svg> ${formatDate(need.date)}</span>
                        <span class="urgency-badge ${need.urgency}" style="font-size:0.65rem;padding:1px 8px;">${getUrgencyLabel(need.urgency)}</span>
                    </div>
                </div>
                <div class="manage-item-actions">
                    <button class="manage-action-btn" onclick="app.editNeed(${need.id})" aria-label="Edit ${need.title}"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M12.9 1.7l1.4 1.4c.4.4.4 1 0 1.4l-1 1L11.5 3.7l1-1c.4-.4 1-.4 1.4 0zM2 11.5V14h2.5l7.4-7.4-2.5-2.5L2 11.5z"/></svg></button>
                    <button class="manage-action-btn delete" onclick="app.deleteNeed(${need.id})" aria-label="Delete ${need.title}"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 13c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V5H4v8zM13 2h-2.5l-1-1h-3l-1 1H3v2h10V2z"/></svg></button>
                </div>
            </div>
        `,
      )
      .join("");
  }

  function deleteNeed(needId) {
    const need = postedNeeds.find((n) => n.id === needId);
    postedNeeds = postedNeeds.filter((n) => n.id !== needId);
    document.getElementById("admin-active-count").textContent =
      postedNeeds.length;
    document.getElementById("admin-stat-active-val").textContent =
      postedNeeds.length;
    renderManageList();
    showToast(`"${need ? need.title : "Need"}" has been removed.`);
    announceToSR("Community need deleted.");
  }

  function editNeed(needId) {
    const need = postedNeeds.find((n) => n.id === needId);
    if (!need) return;
    document.getElementById("need-title").value = need.title;
    document.getElementById("need-category").value = need.category || "";
    document.getElementById("need-location").value = need.location;
    document.getElementById("need-lat").value = need.lat || "";
    document.getElementById("need-lng").value = need.lng || "";
    document.getElementById("need-skills").value = need.skills.join(", ");
    document.getElementById("need-urgency").value = need.urgency;
    document.getElementById("need-desc").value = need.description || "";
    document.getElementById("need-date").value = need.date || "";
    postedNeeds = postedNeeds.filter((n) => n.id !== needId);
    switchAdminTab("post");
    showToast(`Editing "${need.title}". Make changes and re-submit.`);
    document.getElementById("need-title").focus();
  }

  // ================================================================
  // ADMIN: MATCHING VIEW
  // ================================================================

  function populateMatchingSelect() {
    const sel = document.getElementById("match-need-select");
    if (!sel) return;
    sel.innerHTML =
      '<option value="" disabled selected>— Choose a need —</option>' +
      postedNeeds
        .map(
          (n) =>
            `<option value="${n.id}">${CATEGORY_ICONS[n.category] || "📋"} ${n.title}</option>`,
        )
        .join("");
  }

  function renderMatchingView() {
    const layout = document.getElementById("matching-layout");
    const sel = document.getElementById("match-need-select");
    const selectedId = parseInt(sel.value);
    const need = postedNeeds.find((n) => n.id === selectedId);

    if (!need) {
      layout.innerHTML = `<div class="matching-empty">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="currentColor" opacity="0.15" style="margin-bottom:16px;"><circle cx="40" cy="40" r="36" stroke="currentColor" stroke-width="2" fill="none"/><path d="M25 40h30M40 25v30" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
                <p style="font-weight:600;font-size:1rem;color:var(--clr-text-muted);">Select a community need above</p>
                <p style="font-size:0.875rem;color:var(--clr-text-muted);margin-top:4px;">We'll show you matching volunteers based on skill overlap.</p>
            </div>`;
      return;
    }

    // Compute matches
    const matches = volunteerProfiles
      .map((vol) => {
        const m = getSkillMatch(vol.skills, need.skills);
        return { ...vol, match: m };
      })
      .sort((a, b) => b.match.percent - a.match.percent);

    layout.innerHTML = `
            <div class="matching-split">
                <!-- NEED PANEL -->
                <div class="matching-need-panel">
                    <div class="matching-panel-header">
                        <h4>Community Need</h4>
                    </div>
                    <div class="matching-need-card">
                        <div class="task-card-urgency-bar ${need.urgency}" style="position:relative;border-radius:8px 8px 0 0;"></div>
                        <h4 class="matching-need-title">${need.title}</h4>
                        <span class="category-badge cat-${(need.category || "").replace(/[^a-zA-Z]/g, "")}" style="margin-bottom:8px;display:inline-block;">${getCategoryBadge(need.category)}</span>
                        <div class="matching-need-meta">
                            <span><svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M7 1C4.24 1 2 3.24 2 6c0 3.5 5 7 5 7s5-3.5 5-7c0-2.76-2.24-5-5-5zm0 6.8A1.8 1.8 0 117 4.4a1.8 1.8 0 010 3.6z"/></svg> ${need.location}</span>
                            ${need.lat ? `<span class="geo-coords-sm">${need.lat.toFixed(4)}°N, ${need.lng.toFixed(4)}°E</span>` : ""}
                            <span><svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" opacity="0.5"><path d="M11 2h-.5V.5h-1V2h-5V.5h-1V2H3C2.17 2 1.5 2.67 1.5 3.5v8c0 .83.67 1.5 1.5 1.5h8c.83 0 1.5-.67 1.5-1.5v-8c0-.83-.67-1.5-1.5-1.5zm0 9.5H3V5.5h8v6z"/></svg> ${formatDate(need.date)}</span>
                        </div>
                        <p class="matching-need-desc">${need.description || ""}</p>
                        <div class="matching-need-skills-label">Required Skills:</div>
                        <div class="matching-need-skills">${need.skills.map((s) => `<span class="skill-tag">${s}</span>`).join("")}</div>
                        <div class="urgency-badge ${need.urgency}" style="margin-top:12px;">${getUrgencyLabel(need.urgency)}</div>
                    </div>
                </div>

                <!-- VOLUNTEERS PANEL -->
                <div class="matching-vol-panel">
                    <div class="matching-panel-header">
                        <h4>Matching Volunteers</h4>
                        <span class="matching-vol-count">${matches.filter((m) => m.match.percent > 0).length} of ${matches.length} match</span>
                    </div>
                    <div class="matching-vol-list">
                        ${matches
                          .map((vol) => {
                            const pct = vol.match.percent;
                            let strengthClass = "no-match";
                            if (pct >= 75) strengthClass = "strong";
                            else if (pct >= 50) strengthClass = "good";
                            else if (pct > 0) strengthClass = "partial";
                            return `
                            <div class="matching-vol-card ${strengthClass}" role="listitem">
                                <div class="matching-vol-top">
                                    <div class="matching-vol-avatar">${vol.firstName[0]}${vol.lastName[0]}</div>
                                    <div class="matching-vol-info">
                                        <div class="matching-vol-name">${vol.firstName} ${vol.lastName}</div>
                                        <div class="matching-vol-zip">📍 ${vol.zip} · ${vol.hours} hrs/wk</div>
                                    </div>
                                    <div class="match-score ${strengthClass}">
                                        <svg class="match-ring" width="48" height="48" viewBox="0 0 48 48">
                                            <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" stroke-width="4" opacity="0.15"/>
                                            <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" stroke-width="4"
                                                stroke-dasharray="${(pct / 100) * 125.66} 125.66"
                                                stroke-linecap="round" transform="rotate(-90 24 24)"/>
                                        </svg>
                                        <span class="match-pct">${pct}%</span>
                                    </div>
                                </div>
                                <div class="matching-vol-skills">
                                    ${vol.skills
                                      .map((s) => {
                                        const isMatch = vol.match.matched
                                          .map((m) => m.toLowerCase())
                                          .includes(s.toLowerCase());
                                        return `<span class="skill-tag ${isMatch ? "skill-matched" : ""}">${isMatch ? "✓ " : ""}${s}</span>`;
                                      })
                                      .join("")}
                                </div>
                                <div class="matching-vol-avail">
                                    <span class="avail-label">Available:</span>
                                    ${vol.availability.map((d) => `<span class="avail-day">${d}</span>`).join("")}
                                </div>
                            </div>`;
                          })
                          .join("")}
                    </div>
                </div>
            </div>`;
  }

  // ================================================================
  // TOAST & ACCESSIBILITY
  // ================================================================

  function showToast(message, type = "default") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<svg class="toast-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            ${type === "success" ? '<path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.5 14.5l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z"/>' : '<path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>'}
        </svg><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("removing");
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  function announceToSR(message) {
    const a = document.createElement("div");
    a.setAttribute("role", "status");
    a.setAttribute("aria-live", "polite");
    a.setAttribute("aria-atomic", "true");
    a.className = "sr-only";
    a.textContent = message;
    document.body.appendChild(a);
    setTimeout(() => a.remove(), 1000);
  }

  // ---- Render heatmap on admin entry ----
  function initAdminExtras() {
    renderHeatmap();
  }

  // ================================================================
  // INITIALIZATION
  // ================================================================

  function init() {
    // Live field validation on need form
    document
      .querySelectorAll("#need-form .form-input, #need-form .form-select")
      .forEach((input) => {
        input.addEventListener("blur", () => {
          if (input.classList.contains("error") && input.value.trim()) {
            input.classList.remove("error");
            const errorId = "err-" + input.id.replace("need-", "");
            const errorEl = document.getElementById(errorId);
            if (errorEl) {
              errorEl.textContent = "";
              errorEl.classList.remove("visible");
            }
          }
        });
      });
    updateGreeting();
    // Fetch volunteers from Firebase
    fetchVolunteers();
    // Pre-render heatmap in case admin is already shown
    renderHeatmap();
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);

  // ---- Public API ----
  return {
    selectRole,
    goBack,
    filterTasks,
    openTaskDetail,
    closeModal,
    volunteerForTask,
    switchAdminTab,
    submitNeed,
    deleteNeed,
    editNeed,
    switchVolunteerView,
    saveProfile,
    filterManageList,
    renderMatchingView,
    populateMatchingSelect,
    showHeatmapTooltip,
    hideHeatmapTooltip,
    runAIMatchmaker,
    toggleChat,
    sendChatMessage,
    // Expose local data for Google Maps heatmap
    _getHeatmapPoints: function () {
      const urgencyWeight = { critical: 5, high: 3, moderate: 2, low: 1 };
      const allNeeds = [...sampleTasks, ...postedNeeds];
      return allNeeds
        .filter(function (n) { return n.lat && n.lng; })
        .map(function (n) {
          return { lat: n.lat, lng: n.lng, weight: urgencyWeight[n.urgency] || 1 };
        });
    },
  };
})();