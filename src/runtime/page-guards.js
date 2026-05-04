export function setupTrustedHTMLSupport() {
    if (typeof window === 'undefined' || window.__searchEngineJumpTrustedHTMLReady) {
        return;
    }
    if (!window.trustedTypes || typeof window.trustedTypes.createPolicy !== 'function') {
        return;
    }

    var policyOptions = {
        createHTML: function (input) {
            return input;
        },
        createScript: function (input) {
            return input;
        },
        createScriptURL: function (input) {
            return input;
        }
    };
    var candidateNames = ['searchEngineJumpPolicy', 'searchEngineJump', 'default'];
    var policy = null;

    for (var i = 0; i < candidateNames.length; i++) {
        try {
            policy = window.trustedTypes.createPolicy(candidateNames[i], policyOptions);
            if (policy) {
                break;
            }
        } catch (error) {
            continue;
        }
    }

    if (!policy) {
        return;
    }

    window.__searchEngineJumpTrustedHTMLReady = true;
    window.__searchEngineJumpTrustedHTMLPolicy = policy;

    var descriptor;
    try {
        descriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
    } catch (error) {
        descriptor = null;
    }

    if (descriptor && descriptor.set && descriptor.configurable !== false) {
        Object.defineProperty(Element.prototype, 'innerHTML', {
            configurable: descriptor.configurable,
            enumerable: descriptor.enumerable,
            get: descriptor.get,
            set: function (value) {
                if (typeof value === 'string' || value instanceof String) {
                    descriptor.set.call(this, policy.createHTML(value.toString()));
                } else {
                    descriptor.set.call(this, value);
                }
            }
        });
    }

    var originalInsertAdjacentHTML = Element.prototype.insertAdjacentHTML;
    if (originalInsertAdjacentHTML) {
        Element.prototype.insertAdjacentHTML = function (position, html) {
            if (typeof html === 'string' || html instanceof String) {
                return originalInsertAdjacentHTML.call(this, position, policy.createHTML(html.toString()));
            }
            return originalInsertAdjacentHTML.call(this, position, html);
        };
    }
}

export function shouldSkipCurrentPage() {
    if (typeof window === 'undefined' || !window.location) {
        return false;
    }
    var host = (window.location.hostname || '').toLowerCase();
    if (!host) {
        return false;
    }
    var isYouTubeDomain = host === 'youtube.com' || /(^|\.)youtube\.com$/.test(host);
    if (!isYouTubeDomain) {
        return false;
    }
    var path = window.location.pathname || '';
    return /^\/watch(?:\/|$)/.test(path);
}
