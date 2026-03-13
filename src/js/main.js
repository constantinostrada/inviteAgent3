/**
 * Main JavaScript file for InviteAgent3
 */

import { DOM, debounce, Storage } from './utils.js';
import { Navigation, LoadingSpinner, Alert, Modal } from './components.js';

/**
 * Main application class
 */
class InviteAgent3App {
  constructor() {
    this.navigation = null;
    this.loadingSpinner = null;
    this.alert = null;
    this.modal = null;
    
    // App state
    this.state = {
      isInitialized: false,
      user: null,
      invitations: [],
      theme: 'light'
    };

    this.init();
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      // Show loading spinner
      this.loadingSpinner = new LoadingSpinner();
      this.loadingSpinner.show();

      // Load saved state
      this.loadState();

      // Initialize components
      this.initializeComponents();

      // Set up event listeners
      this.setupEventListeners();

      // Initialize theme
      this.initializeTheme();

      // Mark as initialized
      this.state.isInitialized = true;
      this.saveState();

      // Hide loading spinner
      setTimeout(() => {
        this.loadingSpinner.hide();
      }, 500);

      console.log('InviteAgent3 initialized successfully');
      
    } catch (error) {
      console.error('Error initializing application:', error);
      this.loadingSpinner?.hide();
    }
  }

  /**
   * Initialize all components
   */
  initializeComponents() {
    // Initialize navigation
    this.navigation = new Navigation();
    
    // Initialize alert system
    this.alert = new Alert();
    
    // Initialize modal system
    this.modal = new Modal();

    // Show welcome message for first-time visitors
    if (!this.state.isInitialized) {
      setTimeout(() => {
        this.alert.success('Welcome to InviteAgent3! 🎉');
      }, 1000);
    }
  }

  /**
   * Set up global event listeners
   */
  setupEventListeners() {
    // Get Started button
    const getStartedBtn = DOM.select('#getStartedBtn');
    if (getStartedBtn) {
      DOM.on(getStartedBtn, 'click', () => this.handleGetStarted());
    }

    // Learn More button
    const learnMoreBtn = DOM.select('#learnMoreBtn');
    if (learnMoreBtn) {
      DOM.on(learnMoreBtn, 'click', () => this.handleLearnMore());
    }

    // Window scroll events (debounced)
    const debouncedScroll = debounce(() => {
      this.handleScroll();
    }, 100);
    DOM.on(window, 'scroll', debouncedScroll);

    // Window resize events (debounced)
    const debouncedResize = debounce(() => {
      this.handleResize();
    }, 250);
    DOM.on(window, 'resize', debouncedResize);

    // Handle form submissions
    this.setupFormHandlers();

    // Handle keyboard shortcuts
    this.setupKeyboardShortcuts();
  }

  /**
   * Set up form handlers
   */
  setupFormHandlers() {
    const forms = DOM.selectAll('form');
    forms.forEach(form => {
      DOM.on(form, 'submit', (e) => this.handleFormSubmit(e));
    });
  }

  /**
   * Set up keyboard shortcuts
   */
  setupKeyboardShortcuts() {
    DOM.on(document, 'keydown', (e) => {
      // Ctrl/Cmd + K for search (example)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Implement search functionality
        console.log('Search shortcut triggered');
      }

      // Escape key to close modals
      if (e.key === 'Escape') {
        // Already handled in Modal component
      }
    });
  }

  /**
   * Initialize theme system
   */
  initializeTheme() {
    const savedTheme = this.state.theme || 'light';
    this.setTheme(savedTheme);

    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (this.state.theme === 'auto') {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  /**
   * Set application theme
   */
  setTheme(theme) {
    this.state.theme = theme;
    
    let actualTheme = theme;
    if (theme === 'auto') {
      actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    this.applyTheme(actualTheme);
    this.saveState();
  }

  /**
   * Apply theme to DOM
   */
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update theme color meta tag
    const themeColorMeta = DOM.select('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'dark' ? '#1f2937' : '#ffffff');
    }
  }

  /**
   * Handle Get Started button click
   */
  handleGetStarted() {
    // Create a simple modal for getting started
    this.modal.create('getStarted', {
      title: 'Get Started with InviteAgent3',
      content: `
        <div class="get-started-content">
          <p>Ready to create your first invitation? Here's how to get started:</p>
          <ol style="margin: 20px 0; padding-left: 20px;">
            <li>Choose from our beautiful templates</li>
            <li>Customize your invitation details</li>
            <li>Add your guest list</li>
            <li>Send and track responses</li>
          </ol>
          <div style="text-align: center; margin-top: 30px;">
            <button class="btn btn--primary" onclick="inviteAgent3App.createSampleInvitation()">
              Create Sample Invitation
            </button>
          </div>
        </div>
      `,
      size: 'medium'
    });
    
    this.modal.open('getStarted');
  }

  /**
   * Handle Learn More button click
   */
  handleLearnMore() {
    // Smooth scroll to features section
    const featuresSection = DOM.select('#features');
    if (featuresSection) {
      const headerHeight = DOM.select('.header')?.offsetHeight || 0;
      const targetPosition = featuresSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Create a sample invitation (demo functionality)
   */
  createSampleInvitation() {
    this.modal.close('getStarted');
    this.loadingSpinner.show();
    
    // Simulate API call
    setTimeout(() => {
      const invitation = {
        id: Date.now(),
        title: 'Sample Birthday Party',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        location: 'Your Home',
        guests: [],
        template: 'birthday',
        created: new Date()
      };
      
      this.state.invitations.push(invitation);
      this.saveState();
      this.loadingSpinner.hide();
      
      this.alert.success('Sample invitation created successfully! 🎂');
      
      // Show invitation details modal
      this.showInvitationDetails(invitation);
    }, 1500);
  }

  /**
   * Show invitation details in a modal
   */
  showInvitationDetails(invitation) {
    const formattedDate = invitation.date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    this.modal.create('invitationDetails', {
      title: invitation.title,
      content: `
        <div class="invitation-details">
          <div class="invitation-card" style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 20px;
          ">
            <h3 style="margin: 0 0 15px 0; font-size: 1.5rem;">🎂 ${invitation.title}</h3>
            <p style="margin: 5px 0; opacity: 0.9;">📅 ${formattedDate}</p>
            <p style="margin: 5px 0; opacity: 0.9;">📍 ${invitation.location}</p>
            <p style="margin: 15px 0 0 0; font-size: 0.9rem; opacity: 0.8;">
              You're invited to celebrate with us!
            </p>
          </div>
          
          <div style="text-align: center;">
            <button class="btn btn--primary" style="margin-right: 10px;" onclick="inviteAgent3App.editInvitation('${invitation.id}')">
              Edit Invitation
            </button>
            <button class="btn btn--secondary" onclick="inviteAgent3App.shareInvitation('${invitation.id}')">
              Share Invitation
            </button>
          </div>
        </div>
      `,
      size: 'medium'
    });
    
    this.modal.open('invitationDetails');
  }

  /**
   * Edit invitation (placeholder)
   */
  editInvitation(id) {
    this.modal.close('invitationDetails');
    this.alert.info('Edit functionality coming soon! ✏️');
  }

  /**
   * Share invitation (placeholder)
   */
  shareInvitation(id) {
    // Simple Web Share API implementation
    if (navigator.share) {
      navigator.share({
        title: 'You\'re Invited!',
        text: 'Join us for a celebration',
        url: window.location.href
      }).catch((error) => {
        console.log('Error sharing:', error);
        this.fallbackShare();
      });
    } else {
      this.fallbackShare();
    }
  }

  /**
   * Fallback share functionality
   */
  fallbackShare() {
    // Copy link to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.alert.success('Invitation link copied to clipboard! 📋');
    }).catch(() => {
      this.alert.info('Share functionality coming soon! 📤');
    });
  }

  /**
   * Handle form submissions
   */
  handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    // Basic form handling
    console.log('Form submitted:', Object.fromEntries(formData));
    this.alert.success('Form submitted successfully!');
  }

  /**
   * Handle window scroll events
   */
  handleScroll() {
    const scrollTop = window.pageYOffset;
    
    // Add scroll class to header for styling
    const header = DOM.select('.header');
    if (header) {
      if (scrollTop > 100) {
        DOM.addClass(header, 'header--scrolled');
      } else {
        DOM.removeClass(header, 'header--scrolled');
      }
    }
  }

  /**
   * Handle window resize events
   */
  handleResize() {
    // Close mobile menu on desktop
    if (window.innerWidth > 768 && this.navigation) {
      this.navigation.closeMobileMenu();
    }
  }

  /**
   * Load application state from localStorage
   */
  loadState() {
    const savedState = Storage.get('inviteAgent3State');
    if (savedState) {
      this.state = {
        ...this.state,
        ...savedState
      };
      
      // Convert date strings back to Date objects
      this.state.invitations = this.state.invitations.map(inv => ({
        ...inv,
        date: new Date(inv.date),
        created: new Date(inv.created)
      }));
    }
  }

  /**
   * Save application state to localStorage
   */
  saveState() {
    Storage.set('inviteAgent3State', this.state);
  }

  /**
   * Get application version
   */
  getVersion() {
    return '1.0.0';
  }

  /**
   * Get application info
   */
  getInfo() {
    return {
      name: 'InviteAgent3',
      version: this.getVersion(),
      initialized: this.state.isInitialized,
      invitations: this.state.invitations.length
    };
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Make app globally accessible for demo purposes
  window.inviteAgent3App = new InviteAgent3App();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    console.log('Welcome back to InviteAgent3!');
  }
});

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment when you create a service worker
    // navigator.serviceWorker.register('/sw.js')
    //   .then((registration) => {
    //     console.log('SW registered: ', registration);
    //   })
    //   .catch((registrationError) => {
    //     console.log('SW registration failed: ', registrationError);
    //   });
  });
}

// Export for module usage
export default InviteAgent3App;