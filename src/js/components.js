/**
 * Reusable components for InviteAgent3
 */

import { DOM } from './utils.js';

/**
 * Navigation component
 */
export class Navigation {
  constructor() {
    this.navToggle = DOM.select('#navToggle');
    this.navMenu = DOM.select('#navMenu');
    this.navLinks = DOM.selectAll('.nav__link');
    
    this.init();
  }

  init() {
    // Mobile menu toggle
    if (this.navToggle && this.navMenu) {
      DOM.on(this.navToggle, 'click', () => this.toggleMobileMenu());
    }

    // Smooth scroll for navigation links
    this.navLinks.forEach(link => {
      DOM.on(link, 'click', (e) => this.handleNavClick(e));
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => this.updateActiveLink());
  }

  toggleMobileMenu() {
    DOM.toggleClass(this.navMenu, 'show');
    DOM.toggleClass(this.navToggle, 'active');
  }

  closeMobileMenu() {
    DOM.removeClass(this.navMenu, 'show');
    DOM.removeClass(this.navToggle, 'active');
  }

  handleNavClick(e) {
    const href = e.target.getAttribute('href');
    
    if (href && href.startsWith('#')) {
      e.preventDefault();
      
      const target = DOM.select(href);
      if (target) {
        const headerHeight = DOM.select('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
      
      this.closeMobileMenu();
    }
  }

  updateActiveLink() {
    const scrollPosition = window.scrollY + 100;
    
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const section = DOM.select(href);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            DOM.addClass(link, 'active');
          } else {
            DOM.removeClass(link, 'active');
          }
        }
      }
    });
  }
}

/**
 * Loading spinner component
 */
export class LoadingSpinner {
  constructor(selector = '#loadingSpinner') {
    this.spinner = DOM.select(selector);
  }

  show() {
    if (this.spinner) {
      DOM.addClass(this.spinner, 'show');
    }
  }

  hide() {
    if (this.spinner) {
      DOM.removeClass(this.spinner, 'show');
    }
  }
}

/**
 * Alert/Notification component
 */
export class Alert {
  constructor() {
    this.container = this.createContainer();
  }

  createContainer() {
    let container = DOM.select('#alertContainer');
    if (!container) {
      container = DOM.create('div', {
        id: 'alertContainer',
        className: 'alert-container',
        style: `
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
          max-width: 400px;
        `
      });
      document.body.appendChild(container);
    }
    return container;
  }

  show(message, type = 'info', duration = 5000) {
    const alert = DOM.create('div', {
      className: `alert alert--${type}`,
      style: `
        margin-bottom: 10px;
        padding: 12px 16px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideInRight 0.3s ease-out;
        cursor: pointer;
      `
    }, message);

    // Close button
    const closeBtn = DOM.create('span', {
      style: `
        float: right;
        margin-left: 10px;
        font-weight: bold;
        cursor: pointer;
      `
    }, '×');

    alert.appendChild(closeBtn);
    this.container.appendChild(alert);

    // Auto remove
    const removeAlert = () => {
      if (alert.parentNode) {
        alert.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
          if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
          }
        }, 300);
      }
    };

    // Click to close
    DOM.on(alert, 'click', removeAlert);
    DOM.on(closeBtn, 'click', (e) => {
      e.stopPropagation();
      removeAlert();
    });

    // Auto close after duration
    if (duration > 0) {
      setTimeout(removeAlert, duration);
    }

    // Add animations to head if not exists
    this.addAnimations();

    return alert;
  }

  addAnimations() {
    if (!DOM.select('#alertAnimations')) {
      const style = DOM.create('style', { id: 'alertAnimations' }, `
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `);
      document.head.appendChild(style);
    }
  }

  success(message, duration = 5000) {
    return this.show(message, 'success', duration);
  }

  error(message, duration = 7000) {
    return this.show(message, 'error', duration);
  }

  warning(message, duration = 6000) {
    return this.show(message, 'warning', duration);
  }

  info(message, duration = 5000) {
    return this.show(message, 'info', duration);
  }
}

/**
 * Modal component
 */
export class Modal {
  constructor() {
    this.modals = new Map();
    this.backdrop = null;
  }

  create(id, options = {}) {
    const {
      title = '',
      content = '',
      size = 'medium',
      closable = true,
      className = ''
    } = options;

    // Create backdrop
    if (!this.backdrop) {
      this.backdrop = DOM.create('div', {
        className: 'modal-backdrop',
        style: `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: none;
          z-index: 1040;
        `
      });
      document.body.appendChild(this.backdrop);
    }

    // Create modal
    const modal = DOM.create('div', {
      id: `modal-${id}`,
      className: `modal modal--${size} ${className}`,
      style: `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 8px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        display: none;
        z-index: 1050;
        max-width: 90vw;
        max-height: 90vh;
        overflow: auto;
      `
    });

    // Modal content structure
    const header = DOM.create('div', {
      className: 'modal__header',
      style: 'padding: 20px 20px 0; display: flex; justify-content: space-between; align-items: center;'
    });

    if (title) {
      const titleEl = DOM.create('h3', {
        className: 'modal__title',
        style: 'margin: 0; font-size: 1.25rem; font-weight: 600;'
      }, title);
      header.appendChild(titleEl);
    }

    if (closable) {
      const closeBtn = DOM.create('button', {
        className: 'modal__close',
        style: `
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        `
      }, '×');
      
      DOM.on(closeBtn, 'click', () => this.close(id));
      header.appendChild(closeBtn);
    }

    const body = DOM.create('div', {
      className: 'modal__body',
      style: 'padding: 20px;'
    }, content);

    modal.appendChild(header);
    modal.appendChild(body);
    document.body.appendChild(modal);

    this.modals.set(id, {
      element: modal,
      options
    });

    return modal;
  }

  open(id) {
    const modal = this.modals.get(id);
    if (!modal) return;

    // Show backdrop
    this.backdrop.style.display = 'block';
    
    // Show modal
    modal.element.style.display = 'block';
    
    // Focus management
    modal.element.focus();
    
    // Close on backdrop click
    const handleBackdropClick = (e) => {
      if (e.target === this.backdrop) {
        this.close(id);
      }
    };
    DOM.on(this.backdrop, 'click', handleBackdropClick);
    
    // Close on Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        this.close(id);
      }
    };
    DOM.on(document, 'keydown', handleEscape);
    
    // Store event handlers for cleanup
    modal.backdropClickHandler = handleBackdropClick;
    modal.escapeHandler = handleEscape;
  }

  close(id) {
    const modal = this.modals.get(id);
    if (!modal) return;

    // Hide modal
    modal.element.style.display = 'none';
    
    // Hide backdrop if no other modals are open
    const hasOpenModals = Array.from(this.modals.values())
      .some(m => m.element.style.display === 'block');
    
    if (!hasOpenModals) {
      this.backdrop.style.display = 'none';
    }
    
    // Clean up event handlers
    if (modal.backdropClickHandler) {
      DOM.off(this.backdrop, 'click', modal.backdropClickHandler);
    }
    if (modal.escapeHandler) {
      DOM.off(document, 'keydown', modal.escapeHandler);
    }
  }

  destroy(id) {
    const modal = this.modals.get(id);
    if (!modal) return;

    this.close(id);
    
    if (modal.element.parentNode) {
      modal.element.parentNode.removeChild(modal.element);
    }
    
    this.modals.delete(id);
  }
}

/**
 * Form validation component
 */
export class FormValidator {
  constructor(formSelector) {
    this.form = DOM.select(formSelector);
    this.rules = new Map();
    this.errors = new Map();
    
    if (this.form) {
      this.init();
    }
  }

  init() {
    DOM.on(this.form, 'submit', (e) => this.handleSubmit(e));
    
    // Real-time validation
    const inputs = DOM.selectAll('input, textarea, select', this.form);
    inputs.forEach(input => {
      DOM.on(input, 'blur', () => this.validateField(input));
      DOM.on(input, 'input', () => this.clearFieldError(input));
    });
  }

  addRule(fieldName, validationRules) {
    this.rules.set(fieldName, validationRules);
  }

  validateField(field) {
    const fieldName = field.name || field.id;
    const rules = this.rules.get(fieldName);
    
    if (!rules) return true;

    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    for (const rule of rules) {
      if (typeof rule.validator === 'function') {
        const result = rule.validator(value, field);
        if (!result) {
          isValid = false;
          errorMessage = rule.message || `${fieldName} is invalid`;
          break;
        }
      }
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
      this.errors.set(fieldName, errorMessage);
    } else {
      this.clearFieldError(field);
      this.errors.delete(fieldName);
    }

    return isValid;
  }

  validateForm() {
    const inputs = DOM.selectAll('input, textarea, select', this.form);
    let isFormValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  showFieldError(field, message) {
    this.clearFieldError(field);
    
    const errorEl = DOM.create('div', {
      className: 'form-error',
      'data-field': field.name || field.id
    }, message);
    
    field.parentNode.appendChild(errorEl);
    DOM.addClass(field, 'form-input--error');
  }

  clearFieldError(field) {
    const fieldName = field.name || field.id;
    const existingError = DOM.select(`[data-field="${fieldName}"]`);
    
    if (existingError) {
      existingError.remove();
    }
    
    DOM.removeClass(field, 'form-input--error');
  }

  handleSubmit(e) {
    e.preventDefault();
    
    if (this.validateForm()) {
      // Form is valid, allow submission
      this.onSuccess && this.onSuccess(new FormData(this.form));
    } else {
      // Form has errors
      this.onError && this.onError(this.errors);
    }
  }

  onSuccess(formData) {
    // Override this method
    console.log('Form is valid:', formData);
  }

  onError(errors) {
    // Override this method
    console.log('Form has errors:', errors);
  }
}