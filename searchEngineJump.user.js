// ==UserScript==
// @name           searchEngineJump 搜索引擎快捷跳转 [20260504] v1.1.4
// @author         NLF&锐经(修改) & iqxin(修改)
// @contributor    iqxin
// @description    方便的在各个搜索引擎之间跳转,增加可视化设置菜单,能更友好的自定义设置,修复百度搜索样式丢失的问题
// @version        [20260504] v1.1.4
// @update-log     v1.1.4：源码升级为 ESM 模块，内置 toGBK，移除远程 @require 依赖；

// @namespace      https://greasyfork.org/zh-CN/scripts/27752-searchenginejump
// @homepage       https://github.com/qxinGitHub/searchEngineJump
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFSElEQVR4nMWXX4hdVxXGf2vfe89kJg61ia0DYzMTMWnoQ0FJtKmtJsFixT8DBSmYtGMLgq0PCqMEKwmxYzSGyUPBB7XRNi0FC6JtwYovgcS0klJD8SHakoExYhLQFkwn9/aeOfv7fDi3SStJ5o4muN4O7L32b33rz94H/s8WS10cvR3yVQaY++wnkESkwDK2sMy1EwXDtzRRziBhu+dGDG48smSA5kUP//wmAFIkrNwiGMOsBzYAQwTzEEeBY8BJO1fYtF+4laGPv/i/Afz1C1sAYwngZiKmsDcDI0DrHUtL4DRwMGAmUnVcCtpHPsrQbS/1DZDe+VFHblKziIjYBjwD3Iu5ARBwBjgJnAkwMAa+z+ZZqXEX8VZg0T784aUDzH3uk0DtVQvlVsMjwGpMB3gauAu8ieB2YDPwxR5gF/gQ+MeoNUFzACI4d+imvgDOp0BVRWo2AW62eRi8wvY/wNtrgGhDL+7a/gIcBLYBu4HrsPdSzr8K/JlcLk2BaCQstSxN2VptuYO93an7WES0UyORGg1Wfu0QKivyQhfb56yhn4B3Ynew1kD1oDTfJF20vi8NYBvjMVubbWHrOdtPhwaAYPVvfs8Hf1u32bJbDtXVbgFvAj4AOgTGzhPhGMdV/wCvbtmAJSyttzRiuWv7CdttAlY/f/iimwdvfQGiAfmtczg/jnOJ8/txtRbnvgAu6FSPtg1AC3wGPAvgWGRYqiSowLwC1Ru4GoFyFPc3ZM8DfGPLB1jZXlhe74sS6AAc+O6vL+tg6LaX2LP/SSA6tkpcYeee36/0D/C7Ve9BwZs97iLMEMDAE5N07z1wSQebvl/y3KkAGDIUsrHpRp8ACeDGw38kZdPMPtrILhvZ1yZ5TZJxvnwuW40GzSSaDa1vJq1oJXVbKZ9qpv5qoO6Cqr5ULB+zfNrygOX7LS+PlCgeu+eimz/1w0yWaTTScIqYTEERcDoiXovFauddAAA22CeRDyKD/Bnkbd32PNgUj09S/GwrUMt+x14hiWVFI1LEVyPidggi4hfOnuv3nr8AEGC5sj1j+4TtAcu7i4HlDwLLqRawMmtmnidn6JYLGIa7C/mbwHeAgYATQexPjVCVxcZd7SUACDCEfRyznXoMr8Sawf4lcDdwI7AKWAdss/0r2dOyr6kFpCn7hiyPRlDY5mM7z10W4F1KFT+/p6ZwDkgT2HuN19Tz3yXWG+NnJ8uR9h0FSStSRAFBwAmbpu3xbP/T9rzkp2zvtt2RzcvfG15EAaC8/8m6FkgmpWdsTyD/COtv9esnj1haZXvEtiXP2d5jc6es+3qHv8/2uO1v2d4hedA2H/n2vxZX4LwS+78E1PcDqprAOPZao9Gxs5PNkc6dXUKnIuI1Z8+lRijLo8AR2+OWqeeBS8n7bE8bd2x4Zc97FwcAaP307vqyiXi7QzBi7OyXGel8GkJEBAFUWUREIXlnL/LCvgBheZ9h2lLHyvxp5rrFAZZiG3e16zliBm3vsD0lu6i5ja0awppWrjrKmeOPjAL/UQP/rf1h11BPJHckT/dkL+vDjeXC0pRy3qGcB22x9oHZKwcAcPTh5UimzrWnexGXlrCFlAvlakq5eiiX3eLtSXnFAABe3j1c/0PgTp1z77NUKmesjHMulKuttq9X/eq+sgAAx35wTZ0OqWNrWqr2KVelqoqcF3DOL1r5dStfHQCoW03K9ApuWrnam/PCnHN+StZDRHSK1jLgCnXBpeymr/8dS+SFbmH7eiu/TkQnNRrkqmL20XVXFwBg7QOzRASSsDJFaxndssPso+uu9tH92b8BowSyPc/iZtEAAAAASUVORK5CYII=
// @license        MIT

// @match          *://**/*
// @exclude        *://mega.nz/*

// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_deleteValue
// @grant          GM_setClipboard
// @grant          GM_registerMenuCommand
// @grant          GM_openInTab
// @grant          GM_xmlhttpRequest
// @connect        *

// @run-at         document-end
// ==/UserScript==
(() => {
  // src/runtime/page-guards.js
  function setupTrustedHTMLSupport() {
    if (typeof window === "undefined" || window.__searchEngineJumpTrustedHTMLReady) {
      return;
    }
    if (!window.trustedTypes || typeof window.trustedTypes.createPolicy !== "function") {
      return;
    }
    var policyOptions = {
      createHTML: function(input) {
        return input;
      },
      createScript: function(input) {
        return input;
      },
      createScriptURL: function(input) {
        return input;
      }
    };
    var candidateNames = ["searchEngineJumpPolicy", "searchEngineJump", "default"];
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
      descriptor = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML");
    } catch (error) {
      descriptor = null;
    }
    if (descriptor && descriptor.set && descriptor.configurable !== false) {
      Object.defineProperty(Element.prototype, "innerHTML", {
        configurable: descriptor.configurable,
        enumerable: descriptor.enumerable,
        get: descriptor.get,
        set: function(value) {
          if (typeof value === "string" || value instanceof String) {
            descriptor.set.call(this, policy.createHTML(value.toString()));
          } else {
            descriptor.set.call(this, value);
          }
        }
      });
    }
    var originalInsertAdjacentHTML = Element.prototype.insertAdjacentHTML;
    if (originalInsertAdjacentHTML) {
      Element.prototype.insertAdjacentHTML = function(position, html) {
        if (typeof html === "string" || html instanceof String) {
          return originalInsertAdjacentHTML.call(this, position, policy.createHTML(html.toString()));
        }
        return originalInsertAdjacentHTML.call(this, position, html);
      };
    }
  }
  function shouldSkipCurrentPage() {
    if (typeof window === "undefined" || !window.location) {
      return false;
    }
    var host = (window.location.hostname || "").toLowerCase();
    if (!host) {
      return false;
    }
    var isYouTubeDomain = host === "youtube.com" || /(^|\.)youtube\.com$/.test(host);
    if (!isYouTubeDomain) {
      return false;
    }
    var path = window.location.pathname || "";
    return /^\/watch(?:\/|$)/.test(path);
  }

  // src/ui/tip.js
  var iqxinTimerGlobalTip = null;
  function iqxinShowTip(text, duration) {
    console.log("iqxin -- 消息提示框: ", text);
    var odom = document.querySelector("#iqixn-global-tip");
    if (!odom) {
      odom = document.createElement("iqxinDiv");
      odom.id = "iqixn-global-tip";
      odom.style.cssText = "opacity: 0;height: 25px;line-height: 25px;letter-spacing: 1px;font-size: 1em;color: #fff;padding: 5px 20px;border-radius: 5px;background-color: #666;position: fixed;z-index: 200000001;left: 50%;bottom: 5%;transform: translate(-50%);transition: .4s;";
      document.body.appendChild(odom);
    }
    odom.innerHTML = text;
    odom.style.opacity = 1;
    duration = duration ? duration : 1500;
    if (!iqxinTimerGlobalTip) {
      iqxinTimerGlobalTip = setTimeout(function() {
        odom.style.opacity = 0;
        iqxinTimerGlobalTip = null;
      }, duration);
    }
  }

  // src/utils/to-gbk.js
  function toGBK(str) {
    var map = {
      //编码对照 unicode(10进制) : gb2312(16进制)
      12288: "A1A1",
      12289: "A1A2",
      12290: "A1A3",
      183: "A1A4",
      713: "A1A5",
      711: "A1A6",
      168: "A1A7",
      12291: "A1A8",
      12293: "A1A9",
      8212: "A1AA",
      65374: "A1AB",
      8214: "A1AC",
      8230: "A1AD",
      8216: "A1AE",
      8217: "A1AF",
      8220: "A1B0",
      8221: "A1B1",
      12308: "A1B2",
      12309: "A1B3",
      12296: "A1B4",
      12297: "A1B5",
      12298: "A1B6",
      12299: "A1B7",
      12300: "A1B8",
      12301: "A1B9",
      12302: "A1BA",
      12303: "A1BB",
      12310: "A1BC",
      12311: "A1BD",
      12304: "A1BE",
      12305: "A1BF",
      177: "A1C0",
      215: "A1C1",
      247: "A1C2",
      8758: "A1C3",
      8743: "A1C4",
      8744: "A1C5",
      8721: "A1C6",
      8719: "A1C7",
      8746: "A1C8",
      8745: "A1C9",
      8712: "A1CA",
      8759: "A1CB",
      8730: "A1CC",
      8869: "A1CD",
      8741: "A1CE",
      8736: "A1CF",
      8978: "A1D0",
      8857: "A1D1",
      8747: "A1D2",
      8750: "A1D3",
      8801: "A1D4",
      8780: "A1D5",
      8776: "A1D6",
      8765: "A1D7",
      8733: "A1D8",
      8800: "A1D9",
      8814: "A1DA",
      8815: "A1DB",
      8804: "A1DC",
      8805: "A1DD",
      8734: "A1DE",
      8757: "A1DF",
      8756: "A1E0",
      9794: "A1E1",
      9792: "A1E2",
      176: "A1E3",
      8242: "A1E4",
      8243: "A1E5",
      8451: "A1E6",
      65284: "A1E7",
      164: "A1E8",
      65504: "A1E9",
      65505: "A1EA",
      8240: "A1EB",
      167: "A1EC",
      8470: "A1ED",
      9734: "A1EE",
      9733: "A1EF",
      9675: "A1F0",
      9679: "A1F1",
      9678: "A1F2",
      9671: "A1F3",
      9670: "A1F4",
      9633: "A1F5",
      9632: "A1F6",
      9651: "A1F7",
      9650: "A1F8",
      8251: "A1F9",
      8594: "A1FA",
      8592: "A1FB",
      8593: "A1FC",
      8595: "A1FD",
      12307: "A1FE",
      8560: "A2A1",
      8561: "A2A2",
      8562: "A2A3",
      8563: "A2A4",
      8564: "A2A5",
      8565: "A2A6",
      8566: "A2A7",
      8567: "A2A8",
      8568: "A2A9",
      8569: "A2AA",
      9352: "A2B1",
      9353: "A2B2",
      9354: "A2B3",
      9355: "A2B4",
      9356: "A2B5",
      9357: "A2B6",
      9358: "A2B7",
      9359: "A2B8",
      9360: "A2B9",
      9361: "A2BA",
      9362: "A2BB",
      9363: "A2BC",
      9364: "A2BD",
      9365: "A2BE",
      9366: "A2BF",
      9367: "A2C0",
      9368: "A2C1",
      9369: "A2C2",
      9370: "A2C3",
      9371: "A2C4",
      9332: "A2C5",
      9333: "A2C6",
      9334: "A2C7",
      9335: "A2C8",
      9336: "A2C9",
      9337: "A2CA",
      9338: "A2CB",
      9339: "A2CC",
      9340: "A2CD",
      9341: "A2CE",
      9342: "A2CF",
      9343: "A2D0",
      9344: "A2D1",
      9345: "A2D2",
      9346: "A2D3",
      9347: "A2D4",
      9348: "A2D5",
      9349: "A2D6",
      9350: "A2D7",
      9351: "A2D8",
      9312: "A2D9",
      9313: "A2DA",
      9314: "A2DB",
      9315: "A2DC",
      9316: "A2DD",
      9317: "A2DE",
      9318: "A2DF",
      9319: "A2E0",
      9320: "A2E1",
      9321: "A2E2",
      12832: "A2E5",
      12833: "A2E6",
      12834: "A2E7",
      12835: "A2E8",
      12836: "A2E9",
      12837: "A2EA",
      12838: "A2EB",
      12839: "A2EC",
      12840: "A2ED",
      12841: "A2EE",
      8544: "A2F1",
      8545: "A2F2",
      8546: "A2F3",
      8547: "A2F4",
      8548: "A2F5",
      8549: "A2F6",
      8550: "A2F7",
      8551: "A2F8",
      8552: "A2F9",
      8553: "A2FA",
      8554: "A2FB",
      8555: "A2FC",
      65281: "A3A1",
      65282: "A3A2",
      65283: "A3A3",
      65509: "A3A4",
      65285: "A3A5",
      65286: "A3A6",
      65287: "A3A7",
      65288: "A3A8",
      65289: "A3A9",
      65290: "A3AA",
      65291: "A3AB",
      65292: "A3AC",
      65293: "A3AD",
      65294: "A3AE",
      65295: "A3AF",
      65296: "A3B0",
      65297: "A3B1",
      65298: "A3B2",
      65299: "A3B3",
      65300: "A3B4",
      65301: "A3B5",
      65302: "A3B6",
      65303: "A3B7",
      65304: "A3B8",
      65305: "A3B9",
      65306: "A3BA",
      65307: "A3BB",
      65308: "A3BC",
      65309: "A3BD",
      65310: "A3BE",
      65311: "A3BF",
      65312: "A3C0",
      65313: "A3C1",
      65314: "A3C2",
      65315: "A3C3",
      65316: "A3C4",
      65317: "A3C5",
      65318: "A3C6",
      65319: "A3C7",
      65320: "A3C8",
      65321: "A3C9",
      65322: "A3CA",
      65323: "A3CB",
      65324: "A3CC",
      65325: "A3CD",
      65326: "A3CE",
      65327: "A3CF",
      65328: "A3D0",
      65329: "A3D1",
      65330: "A3D2",
      65331: "A3D3",
      65332: "A3D4",
      65333: "A3D5",
      65334: "A3D6",
      65335: "A3D7",
      65336: "A3D8",
      65337: "A3D9",
      65338: "A3DA",
      65339: "A3DB",
      65340: "A3DC",
      65341: "A3DD",
      65342: "A3DE",
      65343: "A3DF",
      65344: "A3E0",
      65345: "A3E1",
      65346: "A3E2",
      65347: "A3E3",
      65348: "A3E4",
      65349: "A3E5",
      65350: "A3E6",
      65351: "A3E7",
      65352: "A3E8",
      65353: "A3E9",
      65354: "A3EA",
      65355: "A3EB",
      65356: "A3EC",
      65357: "A3ED",
      65358: "A3EE",
      65359: "A3EF",
      65360: "A3F0",
      65361: "A3F1",
      65362: "A3F2",
      65363: "A3F3",
      65364: "A3F4",
      65365: "A3F5",
      65366: "A3F6",
      65367: "A3F7",
      65368: "A3F8",
      65369: "A3F9",
      65370: "A3FA",
      65371: "A3FB",
      65372: "A3FC",
      65373: "A3FD",
      65507: "A3FE",
      12353: "A4A1",
      12354: "A4A2",
      12355: "A4A3",
      12356: "A4A4",
      12357: "A4A5",
      12358: "A4A6",
      12359: "A4A7",
      12360: "A4A8",
      12361: "A4A9",
      12362: "A4AA",
      12363: "A4AB",
      12364: "A4AC",
      12365: "A4AD",
      12366: "A4AE",
      12367: "A4AF",
      12368: "A4B0",
      12369: "A4B1",
      12370: "A4B2",
      12371: "A4B3",
      12372: "A4B4",
      12373: "A4B5",
      12374: "A4B6",
      12375: "A4B7",
      12376: "A4B8",
      12377: "A4B9",
      12378: "A4BA",
      12379: "A4BB",
      12380: "A4BC",
      12381: "A4BD",
      12382: "A4BE",
      12383: "A4BF",
      12384: "A4C0",
      12385: "A4C1",
      12386: "A4C2",
      12387: "A4C3",
      12388: "A4C4",
      12389: "A4C5",
      12390: "A4C6",
      12391: "A4C7",
      12392: "A4C8",
      12393: "A4C9",
      12394: "A4CA",
      12395: "A4CB",
      12396: "A4CC",
      12397: "A4CD",
      12398: "A4CE",
      12399: "A4CF",
      12400: "A4D0",
      12401: "A4D1",
      12402: "A4D2",
      12403: "A4D3",
      12404: "A4D4",
      12405: "A4D5",
      12406: "A4D6",
      12407: "A4D7",
      12408: "A4D8",
      12409: "A4D9",
      12410: "A4DA",
      12411: "A4DB",
      12412: "A4DC",
      12413: "A4DD",
      12414: "A4DE",
      12415: "A4DF",
      12416: "A4E0",
      12417: "A4E1",
      12418: "A4E2",
      12419: "A4E3",
      12420: "A4E4",
      12421: "A4E5",
      12422: "A4E6",
      12423: "A4E7",
      12424: "A4E8",
      12425: "A4E9",
      12426: "A4EA",
      12427: "A4EB",
      12428: "A4EC",
      12429: "A4ED",
      12430: "A4EE",
      12431: "A4EF",
      12432: "A4F0",
      12433: "A4F1",
      12434: "A4F2",
      12435: "A4F3",
      12449: "A5A1",
      12450: "A5A2",
      12451: "A5A3",
      12452: "A5A4",
      12453: "A5A5",
      12454: "A5A6",
      12455: "A5A7",
      12456: "A5A8",
      12457: "A5A9",
      12458: "A5AA",
      12459: "A5AB",
      12460: "A5AC",
      12461: "A5AD",
      12462: "A5AE",
      12463: "A5AF",
      12464: "A5B0",
      12465: "A5B1",
      12466: "A5B2",
      12467: "A5B3",
      12468: "A5B4",
      12469: "A5B5",
      12470: "A5B6",
      12471: "A5B7",
      12472: "A5B8",
      12473: "A5B9",
      12474: "A5BA",
      12475: "A5BB",
      12476: "A5BC",
      12477: "A5BD",
      12478: "A5BE",
      12479: "A5BF",
      12480: "A5C0",
      12481: "A5C1",
      12482: "A5C2",
      12483: "A5C3",
      12484: "A5C4",
      12485: "A5C5",
      12486: "A5C6",
      12487: "A5C7",
      12488: "A5C8",
      12489: "A5C9",
      12490: "A5CA",
      12491: "A5CB",
      12492: "A5CC",
      12493: "A5CD",
      12494: "A5CE",
      12495: "A5CF",
      12496: "A5D0",
      12497: "A5D1",
      12498: "A5D2",
      12499: "A5D3",
      12500: "A5D4",
      12501: "A5D5",
      12502: "A5D6",
      12503: "A5D7",
      12504: "A5D8",
      12505: "A5D9",
      12506: "A5DA",
      12507: "A5DB",
      12508: "A5DC",
      12509: "A5DD",
      12510: "A5DE",
      12511: "A5DF",
      12512: "A5E0",
      12513: "A5E1",
      12514: "A5E2",
      12515: "A5E3",
      12516: "A5E4",
      12517: "A5E5",
      12518: "A5E6",
      12519: "A5E7",
      12520: "A5E8",
      12521: "A5E9",
      12522: "A5EA",
      12523: "A5EB",
      12524: "A5EC",
      12525: "A5ED",
      12526: "A5EE",
      12527: "A5EF",
      12528: "A5F0",
      12529: "A5F1",
      12530: "A5F2",
      12531: "A5F3",
      12532: "A5F4",
      12533: "A5F5",
      12534: "A5F6",
      913: "A6A1",
      914: "A6A2",
      915: "A6A3",
      916: "A6A4",
      917: "A6A5",
      918: "A6A6",
      919: "A6A7",
      920: "A6A8",
      921: "A6A9",
      922: "A6AA",
      923: "A6AB",
      924: "A6AC",
      925: "A6AD",
      926: "A6AE",
      927: "A6AF",
      928: "A6B0",
      929: "A6B1",
      931: "A6B2",
      932: "A6B3",
      933: "A6B4",
      934: "A6B5",
      935: "A6B6",
      936: "A6B7",
      937: "A6B8",
      945: "A6C1",
      946: "A6C2",
      947: "A6C3",
      948: "A6C4",
      949: "A6C5",
      950: "A6C6",
      951: "A6C7",
      952: "A6C8",
      953: "A6C9",
      954: "A6CA",
      955: "A6CB",
      956: "A6CC",
      957: "A6CD",
      958: "A6CE",
      959: "A6CF",
      960: "A6D0",
      961: "A6D1",
      963: "A6D2",
      964: "A6D3",
      965: "A6D4",
      966: "A6D5",
      967: "A6D6",
      968: "A6D7",
      969: "A6D8",
      65077: "A6E0",
      65078: "A6E1",
      65081: "A6E2",
      65082: "A6E3",
      65087: "A6E4",
      65088: "A6E5",
      65085: "A6E6",
      65086: "A6E7",
      65089: "A6E8",
      65090: "A6E9",
      65091: "A6EA",
      65092: "A6EB",
      65083: "A6EE",
      65084: "A6EF",
      65079: "A6F0",
      65080: "A6F1",
      65073: "A6F2",
      65075: "A6F4",
      65076: "A6F5",
      1040: "A7A1",
      1041: "A7A2",
      1042: "A7A3",
      1043: "A7A4",
      1044: "A7A5",
      1045: "A7A6",
      1025: "A7A7",
      1046: "A7A8",
      1047: "A7A9",
      1048: "A7AA",
      1049: "A7AB",
      1050: "A7AC",
      1051: "A7AD",
      1052: "A7AE",
      1053: "A7AF",
      1054: "A7B0",
      1055: "A7B1",
      1056: "A7B2",
      1057: "A7B3",
      1058: "A7B4",
      1059: "A7B5",
      1060: "A7B6",
      1061: "A7B7",
      1062: "A7B8",
      1063: "A7B9",
      1064: "A7BA",
      1065: "A7BB",
      1066: "A7BC",
      1067: "A7BD",
      1068: "A7BE",
      1069: "A7BF",
      1070: "A7C0",
      1071: "A7C1",
      1072: "A7D1",
      1073: "A7D2",
      1074: "A7D3",
      1075: "A7D4",
      1076: "A7D5",
      1077: "A7D6",
      1105: "A7D7",
      1078: "A7D8",
      1079: "A7D9",
      1080: "A7DA",
      1081: "A7DB",
      1082: "A7DC",
      1083: "A7DD",
      1084: "A7DE",
      1085: "A7DF",
      1086: "A7E0",
      1087: "A7E1",
      1088: "A7E2",
      1089: "A7E3",
      1090: "A7E4",
      1091: "A7E5",
      1092: "A7E6",
      1093: "A7E7",
      1094: "A7E8",
      1095: "A7E9",
      1096: "A7EA",
      1097: "A7EB",
      1098: "A7EC",
      1099: "A7ED",
      1100: "A7EE",
      1101: "A7EF",
      1102: "A7F0",
      1103: "A7F1",
      257: "A8A1",
      225: "A8A2",
      462: "A8A3",
      224: "A8A4",
      275: "A8A5",
      233: "A8A6",
      283: "A8A7",
      232: "A8A8",
      299: "A8A9",
      237: "A8AA",
      464: "A8AB",
      236: "A8AC",
      333: "A8AD",
      243: "A8AE",
      466: "A8AF",
      242: "A8B0",
      363: "A8B1",
      250: "A8B2",
      468: "A8B3",
      249: "A8B4",
      470: "A8B5",
      472: "A8B6",
      474: "A8B7",
      476: "A8B8",
      252: "A8B9",
      234: "A8BA",
      593: "A8BB",
      324: "A8BD",
      328: "A8BE",
      609: "A8C0",
      12549: "A8C5",
      12550: "A8C6",
      12551: "A8C7",
      12552: "A8C8",
      12553: "A8C9",
      12554: "A8CA",
      12555: "A8CB",
      12556: "A8CC",
      12557: "A8CD",
      12558: "A8CE",
      12559: "A8CF",
      12560: "A8D0",
      12561: "A8D1",
      12562: "A8D2",
      12563: "A8D3",
      12564: "A8D4",
      12565: "A8D5",
      12566: "A8D6",
      12567: "A8D7",
      12568: "A8D8",
      12569: "A8D9",
      12570: "A8DA",
      12571: "A8DB",
      12572: "A8DC",
      12573: "A8DD",
      12574: "A8DE",
      12575: "A8DF",
      12576: "A8E0",
      12577: "A8E1",
      12578: "A8E2",
      12579: "A8E3",
      12580: "A8E4",
      12581: "A8E5",
      12582: "A8E6",
      12583: "A8E7",
      12584: "A8E8",
      12585: "A8E9",
      9472: "A9A4",
      9473: "A9A5",
      9474: "A9A6",
      9475: "A9A7",
      9476: "A9A8",
      9477: "A9A9",
      9478: "A9AA",
      9479: "A9AB",
      9480: "A9AC",
      9481: "A9AD",
      9482: "A9AE",
      9483: "A9AF",
      9484: "A9B0",
      9485: "A9B1",
      9486: "A9B2",
      9487: "A9B3",
      9488: "A9B4",
      9489: "A9B5",
      9490: "A9B6",
      9491: "A9B7",
      9492: "A9B8",
      9493: "A9B9",
      9494: "A9BA",
      9495: "A9BB",
      9496: "A9BC",
      9497: "A9BD",
      9498: "A9BE",
      9499: "A9BF",
      9500: "A9C0",
      9501: "A9C1",
      9502: "A9C2",
      9503: "A9C3",
      9504: "A9C4",
      9505: "A9C5",
      9506: "A9C6",
      9507: "A9C7",
      9508: "A9C8",
      9509: "A9C9",
      9510: "A9CA",
      9511: "A9CB",
      9512: "A9CC",
      9513: "A9CD",
      9514: "A9CE",
      9515: "A9CF",
      9516: "A9D0",
      9517: "A9D1",
      9518: "A9D2",
      9519: "A9D3",
      9520: "A9D4",
      9521: "A9D5",
      9522: "A9D6",
      9523: "A9D7",
      9524: "A9D8",
      9525: "A9D9",
      9526: "A9DA",
      9527: "A9DB",
      9528: "A9DC",
      9529: "A9DD",
      9530: "A9DE",
      9531: "A9DF",
      9532: "A9E0",
      9533: "A9E1",
      9534: "A9E2",
      9535: "A9E3",
      9536: "A9E4",
      9537: "A9E5",
      9538: "A9E6",
      9539: "A9E7",
      9540: "A9E8",
      9541: "A9E9",
      9542: "A9EA",
      9543: "A9EB",
      9544: "A9EC",
      9545: "A9ED",
      9546: "A9EE",
      9547: "A9EF",
      30403: "B0A0",
      21834: "B0A1",
      38463: "B0A2",
      22467: "B0A3",
      25384: "B0A4",
      21710: "B0A5",
      21769: "B0A6",
      21696: "B0A7",
      30353: "B0A8",
      30284: "B0A9",
      34108: "B0AA",
      30702: "B0AB",
      33406: "B0AC",
      30861: "B0AD",
      29233: "B0AE",
      38552: "B0AF",
      38797: "B0B0",
      27688: "B0B1",
      23433: "B0B2",
      20474: "B0B3",
      25353: "B0B4",
      26263: "B0B5",
      23736: "B0B6",
      33018: "B0B7",
      26696: "B0B8",
      32942: "B0B9",
      26114: "B0BA",
      30414: "B0BB",
      20985: "B0BC",
      25942: "B0BD",
      29100: "B0BE",
      32753: "B0BF",
      34948: "B0C0",
      20658: "B0C1",
      22885: "B0C2",
      25034: "B0C3",
      28595: "B0C4",
      33453: "B0C5",
      25420: "B0C6",
      25170: "B0C7",
      21485: "B0C8",
      21543: "B0C9",
      31494: "B0CA",
      20843: "B0CB",
      30116: "B0CC",
      24052: "B0CD",
      25300: "B0CE",
      36299: "B0CF",
      38774: "B0D0",
      25226: "B0D1",
      32793: "B0D2",
      22365: "B0D3",
      38712: "B0D4",
      32610: "B0D5",
      29240: "B0D6",
      30333: "B0D7",
      26575: "B0D8",
      30334: "B0D9",
      25670: "B0DA",
      20336: "B0DB",
      36133: "B0DC",
      25308: "B0DD",
      31255: "B0DE",
      26001: "B0DF",
      29677: "B0E0",
      25644: "B0E1",
      25203: "B0E2",
      33324: "B0E3",
      39041: "B0E4",
      26495: "B0E5",
      29256: "B0E6",
      25198: "B0E7",
      25292: "B0E8",
      20276: "B0E9",
      29923: "B0EA",
      21322: "B0EB",
      21150: "B0EC",
      32458: "B0ED",
      37030: "B0EE",
      24110: "B0EF",
      26758: "B0F0",
      27036: "B0F1",
      33152: "B0F2",
      32465: "B0F3",
      26834: "B0F4",
      30917: "B0F5",
      34444: "B0F6",
      38225: "B0F7",
      20621: "B0F8",
      35876: "B0F9",
      33502: "B0FA",
      32990: "B0FB",
      21253: "B0FC",
      35090: "B0FD",
      21093: "B0FE",
      34180: "B1A1",
      38649: "B1A2",
      20445: "B1A3",
      22561: "B1A4",
      39281: "B1A5",
      23453: "B1A6",
      25265: "B1A7",
      25253: "B1A8",
      26292: "B1A9",
      35961: "B1AA",
      40077: "B1AB",
      29190: "B1AC",
      26479: "B1AD",
      30865: "B1AE",
      24754: "B1AF",
      21329: "B1B0",
      21271: "B1B1",
      36744: "B1B2",
      32972: "B1B3",
      36125: "B1B4",
      38049: "B1B5",
      20493: "B1B6",
      29384: "B1B7",
      22791: "B1B8",
      24811: "B1B9",
      28953: "B1BA",
      34987: "B1BB",
      22868: "B1BC",
      33519: "B1BD",
      26412: "B1BE",
      31528: "B1BF",
      23849: "B1C0",
      32503: "B1C1",
      29997: "B1C2",
      27893: "B1C3",
      36454: "B1C4",
      36856: "B1C5",
      36924: "B1C6",
      40763: "B1C7",
      27604: "B1C8",
      37145: "B1C9",
      31508: "B1CA",
      24444: "B1CB",
      30887: "B1CC",
      34006: "B1CD",
      34109: "B1CE",
      27605: "B1CF",
      27609: "B1D0",
      27606: "B1D1",
      24065: "B1D2",
      24199: "B1D3",
      30201: "B1D4",
      38381: "B1D5",
      25949: "B1D6",
      24330: "B1D7",
      24517: "B1D8",
      36767: "B1D9",
      22721: "B1DA",
      33218: "B1DB",
      36991: "B1DC",
      38491: "B1DD",
      38829: "B1DE",
      36793: "B1DF",
      32534: "B1E0",
      36140: "B1E1",
      25153: "B1E2",
      20415: "B1E3",
      21464: "B1E4",
      21342: "B1E5",
      36776: "B1E6",
      36777: "B1E7",
      36779: "B1E8",
      36941: "B1E9",
      26631: "B1EA",
      24426: "B1EB",
      33176: "B1EC",
      34920: "B1ED",
      40150: "B1EE",
      24971: "B1EF",
      21035: "B1F0",
      30250: "B1F1",
      24428: "B1F2",
      25996: "B1F3",
      28626: "B1F4",
      28392: "B1F5",
      23486: "B1F6",
      25672: "B1F7",
      20853: "B1F8",
      20912: "B1F9",
      26564: "B1FA",
      19993: "B1FB",
      31177: "B1FC",
      39292: "B1FD",
      28851: "B1FE",
      30149: "B2A1",
      24182: "B2A2",
      29627: "B2A3",
      33760: "B2A4",
      25773: "B2A5",
      25320: "B2A6",
      38069: "B2A7",
      27874: "B2A8",
      21338: "B2A9",
      21187: "B2AA",
      25615: "B2AB",
      38082: "B2AC",
      31636: "B2AD",
      20271: "B2AE",
      24091: "B2AF",
      33334: "B2B0",
      33046: "B2B1",
      33162: "B2B2",
      28196: "B2B3",
      27850: "B2B4",
      39539: "B2B5",
      25429: "B2B6",
      21340: "B2B7",
      21754: "B2B8",
      34917: "B2B9",
      22496: "B2BA",
      19981: "B2BB",
      24067: "B2BC",
      27493: "B2BD",
      31807: "B2BE",
      37096: "B2BF",
      24598: "B2C0",
      25830: "B2C1",
      29468: "B2C2",
      35009: "B2C3",
      26448: "B2C4",
      25165: "B2C5",
      36130: "B2C6",
      30572: "B2C7",
      36393: "B2C8",
      37319: "B2C9",
      24425: "B2CA",
      33756: "B2CB",
      34081: "B2CC",
      39184: "B2CD",
      21442: "B2CE",
      34453: "B2CF",
      27531: "B2D0",
      24813: "B2D1",
      24808: "B2D2",
      28799: "B2D3",
      33485: "B2D4",
      33329: "B2D5",
      20179: "B2D6",
      27815: "B2D7",
      34255: "B2D8",
      25805: "B2D9",
      31961: "B2DA",
      27133: "B2DB",
      26361: "B2DC",
      33609: "B2DD",
      21397: "B2DE",
      31574: "B2DF",
      20391: "B2E0",
      20876: "B2E1",
      27979: "B2E2",
      23618: "B2E3",
      36461: "B2E4",
      25554: "B2E5",
      21449: "B2E6",
      33580: "B2E7",
      33590: "B2E8",
      26597: "B2E9",
      30900: "B2EA",
      25661: "B2EB",
      23519: "B2EC",
      23700: "B2ED",
      24046: "B2EE",
      35815: "B2EF",
      25286: "B2F0",
      26612: "B2F1",
      35962: "B2F2",
      25600: "B2F3",
      25530: "B2F4",
      34633: "B2F5",
      39307: "B2F6",
      35863: "B2F7",
      32544: "B2F8",
      38130: "B2F9",
      20135: "B2FA",
      38416: "B2FB",
      39076: "B2FC",
      26124: "B2FD",
      29462: "B2FE",
      22330: "B3A1",
      23581: "B3A2",
      24120: "B3A3",
      38271: "B3A4",
      20607: "B3A5",
      32928: "B3A6",
      21378: "B3A7",
      25950: "B3A8",
      30021: "B3A9",
      21809: "B3AA",
      20513: "B3AB",
      36229: "B3AC",
      25220: "B3AD",
      38046: "B3AE",
      26397: "B3AF",
      22066: "B3B0",
      28526: "B3B1",
      24034: "B3B2",
      21557: "B3B3",
      28818: "B3B4",
      36710: "B3B5",
      25199: "B3B6",
      25764: "B3B7",
      25507: "B3B8",
      24443: "B3B9",
      28552: "B3BA",
      37108: "B3BB",
      33251: "B3BC",
      36784: "B3BD",
      23576: "B3BE",
      26216: "B3BF",
      24561: "B3C0",
      27785: "B3C1",
      38472: "B3C2",
      36225: "B3C3",
      34924: "B3C4",
      25745: "B3C5",
      31216: "B3C6",
      22478: "B3C7",
      27225: "B3C8",
      25104: "B3C9",
      21576: "B3CA",
      20056: "B3CB",
      31243: "B3CC",
      24809: "B3CD",
      28548: "B3CE",
      35802: "B3CF",
      25215: "B3D0",
      36894: "B3D1",
      39563: "B3D2",
      31204: "B3D3",
      21507: "B3D4",
      30196: "B3D5",
      25345: "B3D6",
      21273: "B3D7",
      27744: "B3D8",
      36831: "B3D9",
      24347: "B3DA",
      39536: "B3DB",
      32827: "B3DC",
      40831: "B3DD",
      20360: "B3DE",
      23610: "B3DF",
      36196: "B3E0",
      32709: "B3E1",
      26021: "B3E2",
      28861: "B3E3",
      20805: "B3E4",
      20914: "B3E5",
      34411: "B3E6",
      23815: "B3E7",
      23456: "B3E8",
      25277: "B3E9",
      37228: "B3EA",
      30068: "B3EB",
      36364: "B3EC",
      31264: "B3ED",
      24833: "B3EE",
      31609: "B3EF",
      20167: "B3F0",
      32504: "B3F1",
      30597: "B3F2",
      19985: "B3F3",
      33261: "B3F4",
      21021: "B3F5",
      20986: "B3F6",
      27249: "B3F7",
      21416: "B3F8",
      36487: "B3F9",
      38148: "B3FA",
      38607: "B3FB",
      28353: "B3FC",
      38500: "B3FD",
      26970: "B3FE",
      30784: "B4A1",
      20648: "B4A2",
      30679: "B4A3",
      25616: "B4A4",
      35302: "B4A5",
      22788: "B4A6",
      25571: "B4A7",
      24029: "B4A8",
      31359: "B4A9",
      26941: "B4AA",
      20256: "B4AB",
      33337: "B4AC",
      21912: "B4AD",
      20018: "B4AE",
      30126: "B4AF",
      31383: "B4B0",
      24162: "B4B1",
      24202: "B4B2",
      38383: "B4B3",
      21019: "B4B4",
      21561: "B4B5",
      28810: "B4B6",
      25462: "B4B7",
      38180: "B4B8",
      22402: "B4B9",
      26149: "B4BA",
      26943: "B4BB",
      37255: "B4BC",
      21767: "B4BD",
      28147: "B4BE",
      32431: "B4BF",
      34850: "B4C0",
      25139: "B4C1",
      32496: "B4C2",
      30133: "B4C3",
      33576: "B4C4",
      30913: "B4C5",
      38604: "B4C6",
      36766: "B4C7",
      24904: "B4C8",
      29943: "B4C9",
      35789: "B4CA",
      27492: "B4CB",
      21050: "B4CC",
      36176: "B4CD",
      27425: "B4CE",
      32874: "B4CF",
      33905: "B4D0",
      22257: "B4D1",
      21254: "B4D2",
      20174: "B4D3",
      19995: "B4D4",
      20945: "B4D5",
      31895: "B4D6",
      37259: "B4D7",
      31751: "B4D8",
      20419: "B4D9",
      36479: "B4DA",
      31713: "B4DB",
      31388: "B4DC",
      25703: "B4DD",
      23828: "B4DE",
      20652: "B4DF",
      33030: "B4E0",
      30209: "B4E1",
      31929: "B4E2",
      28140: "B4E3",
      32736: "B4E4",
      26449: "B4E5",
      23384: "B4E6",
      23544: "B4E7",
      30923: "B4E8",
      25774: "B4E9",
      25619: "B4EA",
      25514: "B4EB",
      25387: "B4EC",
      38169: "B4ED",
      25645: "B4EE",
      36798: "B4EF",
      31572: "B4F0",
      30249: "B4F1",
      25171: "B4F2",
      22823: "B4F3",
      21574: "B4F4",
      27513: "B4F5",
      20643: "B4F6",
      25140: "B4F7",
      24102: "B4F8",
      27526: "B4F9",
      20195: "B4FA",
      36151: "B4FB",
      34955: "B4FC",
      24453: "B4FD",
      36910: "B4FE",
      24608: "B5A1",
      32829: "B5A2",
      25285: "B5A3",
      20025: "B5A4",
      21333: "B5A5",
      37112: "B5A6",
      25528: "B5A7",
      32966: "B5A8",
      26086: "B5A9",
      27694: "B5AA",
      20294: "B5AB",
      24814: "B5AC",
      28129: "B5AD",
      35806: "B5AE",
      24377: "B5AF",
      34507: "B5B0",
      24403: "B5B1",
      25377: "B5B2",
      20826: "B5B3",
      33633: "B5B4",
      26723: "B5B5",
      20992: "B5B6",
      25443: "B5B7",
      36424: "B5B8",
      20498: "B5B9",
      23707: "B5BA",
      31095: "B5BB",
      23548: "B5BC",
      21040: "B5BD",
      31291: "B5BE",
      24764: "B5BF",
      36947: "B5C0",
      30423: "B5C1",
      24503: "B5C2",
      24471: "B5C3",
      30340: "B5C4",
      36460: "B5C5",
      28783: "B5C6",
      30331: "B5C7",
      31561: "B5C8",
      30634: "B5C9",
      20979: "B5CA",
      37011: "B5CB",
      22564: "B5CC",
      20302: "B5CD",
      28404: "B5CE",
      36842: "B5CF",
      25932: "B5D0",
      31515: "B5D1",
      29380: "B5D2",
      28068: "B5D3",
      32735: "B5D4",
      23265: "B5D5",
      25269: "B5D6",
      24213: "B5D7",
      22320: "B5D8",
      33922: "B5D9",
      31532: "B5DA",
      24093: "B5DB",
      24351: "B5DC",
      36882: "B5DD",
      32532: "B5DE",
      39072: "B5DF",
      25474: "B5E0",
      28359: "B5E1",
      30872: "B5E2",
      28857: "B5E3",
      20856: "B5E4",
      38747: "B5E5",
      22443: "B5E6",
      30005: "B5E7",
      20291: "B5E8",
      30008: "B5E9",
      24215: "B5EA",
      24806: "B5EB",
      22880: "B5EC",
      28096: "B5ED",
      27583: "B5EE",
      30857: "B5EF",
      21500: "B5F0",
      38613: "B5F1",
      20939: "B5F2",
      20993: "B5F3",
      25481: "B5F4",
      21514: "B5F5",
      38035: "B5F6",
      35843: "B5F7",
      36300: "B5F8",
      29241: "B5F9",
      30879: "B5FA",
      34678: "B5FB",
      36845: "B5FC",
      35853: "B5FD",
      21472: "B5FE",
      19969: "B6A1",
      30447: "B6A2",
      21486: "B6A3",
      38025: "B6A4",
      39030: "B6A5",
      40718: "B6A6",
      38189: "B6A7",
      23450: "B6A8",
      35746: "B6A9",
      20002: "B6AA",
      19996: "B6AB",
      20908: "B6AC",
      33891: "B6AD",
      25026: "B6AE",
      21160: "B6AF",
      26635: "B6B0",
      20375: "B6B1",
      24683: "B6B2",
      20923: "B6B3",
      27934: "B6B4",
      20828: "B6B5",
      25238: "B6B6",
      26007: "B6B7",
      38497: "B6B8",
      35910: "B6B9",
      36887: "B6BA",
      30168: "B6BB",
      37117: "B6BC",
      30563: "B6BD",
      27602: "B6BE",
      29322: "B6BF",
      29420: "B6C0",
      35835: "B6C1",
      22581: "B6C2",
      30585: "B6C3",
      36172: "B6C4",
      26460: "B6C5",
      38208: "B6C6",
      32922: "B6C7",
      24230: "B6C8",
      28193: "B6C9",
      22930: "B6CA",
      31471: "B6CB",
      30701: "B6CC",
      38203: "B6CD",
      27573: "B6CE",
      26029: "B6CF",
      32526: "B6D0",
      22534: "B6D1",
      20817: "B6D2",
      38431: "B6D3",
      23545: "B6D4",
      22697: "B6D5",
      21544: "B6D6",
      36466: "B6D7",
      25958: "B6D8",
      39039: "B6D9",
      22244: "B6DA",
      38045: "B6DB",
      30462: "B6DC",
      36929: "B6DD",
      25479: "B6DE",
      21702: "B6DF",
      22810: "B6E0",
      22842: "B6E1",
      22427: "B6E2",
      36530: "B6E3",
      26421: "B6E4",
      36346: "B6E5",
      33333: "B6E6",
      21057: "B6E7",
      24816: "B6E8",
      22549: "B6E9",
      34558: "B6EA",
      23784: "B6EB",
      40517: "B6EC",
      20420: "B6ED",
      39069: "B6EE",
      35769: "B6EF",
      23077: "B6F0",
      24694: "B6F1",
      21380: "B6F2",
      25212: "B6F3",
      36943: "B6F4",
      37122: "B6F5",
      39295: "B6F6",
      24681: "B6F7",
      32780: "B6F8",
      20799: "B6F9",
      32819: "B6FA",
      23572: "B6FB",
      39285: "B6FC",
      27953: "B6FD",
      20108: "B6FE",
      36144: "B7A1",
      21457: "B7A2",
      32602: "B7A3",
      31567: "B7A4",
      20240: "B7A5",
      20047: "B7A6",
      38400: "B7A7",
      27861: "B7A8",
      29648: "B7A9",
      34281: "B7AA",
      24070: "B7AB",
      30058: "B7AC",
      32763: "B7AD",
      27146: "B7AE",
      30718: "B7AF",
      38034: "B7B0",
      32321: "B7B1",
      20961: "B7B2",
      28902: "B7B3",
      21453: "B7B4",
      36820: "B7B5",
      33539: "B7B6",
      36137: "B7B7",
      29359: "B7B8",
      39277: "B7B9",
      27867: "B7BA",
      22346: "B7BB",
      33459: "B7BC",
      26041: "B7BD",
      32938: "B7BE",
      25151: "B7BF",
      38450: "B7C0",
      22952: "B7C1",
      20223: "B7C2",
      35775: "B7C3",
      32442: "B7C4",
      25918: "B7C5",
      33778: "B7C6",
      38750: "B7C7",
      21857: "B7C8",
      39134: "B7C9",
      32933: "B7CA",
      21290: "B7CB",
      35837: "B7CC",
      21536: "B7CD",
      32954: "B7CE",
      24223: "B7CF",
      27832: "B7D0",
      36153: "B7D1",
      33452: "B7D2",
      37210: "B7D3",
      21545: "B7D4",
      27675: "B7D5",
      20998: "B7D6",
      32439: "B7D7",
      22367: "B7D8",
      28954: "B7D9",
      27774: "B7DA",
      31881: "B7DB",
      22859: "B7DC",
      20221: "B7DD",
      24575: "B7DE",
      24868: "B7DF",
      31914: "B7E0",
      20016: "B7E1",
      23553: "B7E2",
      26539: "B7E3",
      34562: "B7E4",
      23792: "B7E5",
      38155: "B7E6",
      39118: "B7E7",
      30127: "B7E8",
      28925: "B7E9",
      36898: "B7EA",
      20911: "B7EB",
      32541: "B7EC",
      35773: "B7ED",
      22857: "B7EE",
      20964: "B7EF",
      20315: "B7F0",
      21542: "B7F1",
      22827: "B7F2",
      25975: "B7F3",
      32932: "B7F4",
      23413: "B7F5",
      25206: "B7F6",
      25282: "B7F7",
      36752: "B7F8",
      24133: "B7F9",
      27679: "B7FA",
      31526: "B7FB",
      20239: "B7FC",
      20440: "B7FD",
      26381: "B7FE",
      28014: "B8A1",
      28074: "B8A2",
      31119: "B8A3",
      34993: "B8A4",
      24343: "B8A5",
      29995: "B8A6",
      25242: "B8A7",
      36741: "B8A8",
      20463: "B8A9",
      37340: "B8AA",
      26023: "B8AB",
      33071: "B8AC",
      33105: "B8AD",
      24220: "B8AE",
      33104: "B8AF",
      36212: "B8B0",
      21103: "B8B1",
      35206: "B8B2",
      36171: "B8B3",
      22797: "B8B4",
      20613: "B8B5",
      20184: "B8B6",
      38428: "B8B7",
      29238: "B8B8",
      33145: "B8B9",
      36127: "B8BA",
      23500: "B8BB",
      35747: "B8BC",
      38468: "B8BD",
      22919: "B8BE",
      32538: "B8BF",
      21648: "B8C0",
      22134: "B8C1",
      22030: "B8C2",
      35813: "B8C3",
      25913: "B8C4",
      27010: "B8C5",
      38041: "B8C6",
      30422: "B8C7",
      28297: "B8C8",
      24178: "B8C9",
      29976: "B8CA",
      26438: "B8CB",
      26577: "B8CC",
      31487: "B8CD",
      32925: "B8CE",
      36214: "B8CF",
      24863: "B8D0",
      31174: "B8D1",
      25954: "B8D2",
      36195: "B8D3",
      20872: "B8D4",
      21018: "B8D5",
      38050: "B8D6",
      32568: "B8D7",
      32923: "B8D8",
      32434: "B8D9",
      23703: "B8DA",
      28207: "B8DB",
      26464: "B8DC",
      31705: "B8DD",
      30347: "B8DE",
      39640: "B8DF",
      33167: "B8E0",
      32660: "B8E1",
      31957: "B8E2",
      25630: "B8E3",
      38224: "B8E4",
      31295: "B8E5",
      21578: "B8E6",
      21733: "B8E7",
      27468: "B8E8",
      25601: "B8E9",
      25096: "B8EA",
      40509: "B8EB",
      33011: "B8EC",
      30105: "B8ED",
      21106: "B8EE",
      38761: "B8EF",
      33883: "B8F0",
      26684: "B8F1",
      34532: "B8F2",
      38401: "B8F3",
      38548: "B8F4",
      38124: "B8F5",
      20010: "B8F6",
      21508: "B8F7",
      32473: "B8F8",
      26681: "B8F9",
      36319: "B8FA",
      32789: "B8FB",
      26356: "B8FC",
      24218: "B8FD",
      32697: "B8FE",
      22466: "B9A1",
      32831: "B9A2",
      26775: "B9A3",
      24037: "B9A4",
      25915: "B9A5",
      21151: "B9A6",
      24685: "B9A7",
      40858: "B9A8",
      20379: "B9A9",
      36524: "B9AA",
      20844: "B9AB",
      23467: "B9AC",
      24339: "B9AD",
      24041: "B9AE",
      27742: "B9AF",
      25329: "B9B0",
      36129: "B9B1",
      20849: "B9B2",
      38057: "B9B3",
      21246: "B9B4",
      27807: "B9B5",
      33503: "B9B6",
      29399: "B9B7",
      22434: "B9B8",
      26500: "B9B9",
      36141: "B9BA",
      22815: "B9BB",
      36764: "B9BC",
      33735: "B9BD",
      21653: "B9BE",
      31629: "B9BF",
      20272: "B9C0",
      27837: "B9C1",
      23396: "B9C2",
      22993: "B9C3",
      40723: "B9C4",
      21476: "B9C5",
      34506: "B9C6",
      39592: "B9C7",
      35895: "B9C8",
      32929: "B9C9",
      25925: "B9CA",
      39038: "B9CB",
      22266: "B9CC",
      38599: "B9CD",
      21038: "B9CE",
      29916: "B9CF",
      21072: "B9D0",
      23521: "B9D1",
      25346: "B9D2",
      35074: "B9D3",
      20054: "B9D4",
      25296: "B9D5",
      24618: "B9D6",
      26874: "B9D7",
      20851: "B9D8",
      23448: "B9D9",
      20896: "B9DA",
      35266: "B9DB",
      31649: "B9DC",
      39302: "B9DD",
      32592: "B9DE",
      24815: "B9DF",
      28748: "B9E0",
      36143: "B9E1",
      20809: "B9E2",
      24191: "B9E3",
      36891: "B9E4",
      29808: "B9E5",
      35268: "B9E6",
      22317: "B9E7",
      30789: "B9E8",
      24402: "B9E9",
      40863: "B9EA",
      38394: "B9EB",
      36712: "B9EC",
      39740: "B9ED",
      35809: "B9EE",
      30328: "B9EF",
      26690: "B9F0",
      26588: "B9F1",
      36330: "B9F2",
      36149: "B9F3",
      21053: "B9F4",
      36746: "B9F5",
      28378: "B9F6",
      26829: "B9F7",
      38149: "B9F8",
      37101: "B9F9",
      22269: "B9FA",
      26524: "B9FB",
      35065: "B9FC",
      36807: "B9FD",
      21704: "B9FE",
      39608: "BAA1",
      23401: "BAA2",
      28023: "BAA3",
      27686: "BAA4",
      20133: "BAA5",
      23475: "BAA6",
      39559: "BAA7",
      37219: "BAA8",
      25e3: "BAA9",
      37039: "BAAA",
      38889: "BAAB",
      21547: "BAAC",
      28085: "BAAD",
      23506: "BAAE",
      20989: "BAAF",
      21898: "BAB0",
      32597: "BAB1",
      32752: "BAB2",
      25788: "BAB3",
      25421: "BAB4",
      26097: "BAB5",
      25022: "BAB6",
      24717: "BAB7",
      28938: "BAB8",
      27735: "BAB9",
      27721: "BABA",
      22831: "BABB",
      26477: "BABC",
      33322: "BABD",
      22741: "BABE",
      22158: "BABF",
      35946: "BAC0",
      27627: "BAC1",
      37085: "BAC2",
      22909: "BAC3",
      32791: "BAC4",
      21495: "BAC5",
      28009: "BAC6",
      21621: "BAC7",
      21917: "BAC8",
      33655: "BAC9",
      33743: "BACA",
      26680: "BACB",
      31166: "BACC",
      21644: "BACD",
      20309: "BACE",
      21512: "BACF",
      30418: "BAD0",
      35977: "BAD1",
      38402: "BAD2",
      27827: "BAD3",
      28088: "BAD4",
      36203: "BAD5",
      35088: "BAD6",
      40548: "BAD7",
      36154: "BAD8",
      22079: "BAD9",
      40657: "BADA",
      30165: "BADB",
      24456: "BADC",
      29408: "BADD",
      24680: "BADE",
      21756: "BADF",
      20136: "BAE0",
      27178: "BAE1",
      34913: "BAE2",
      24658: "BAE3",
      36720: "BAE4",
      21700: "BAE5",
      28888: "BAE6",
      34425: "BAE7",
      40511: "BAE8",
      27946: "BAE9",
      23439: "BAEA",
      24344: "BAEB",
      32418: "BAEC",
      21897: "BAED",
      20399: "BAEE",
      29492: "BAEF",
      21564: "BAF0",
      21402: "BAF1",
      20505: "BAF2",
      21518: "BAF3",
      21628: "BAF4",
      20046: "BAF5",
      24573: "BAF6",
      29786: "BAF7",
      22774: "BAF8",
      33899: "BAF9",
      32993: "BAFA",
      34676: "BAFB",
      29392: "BAFC",
      31946: "BAFD",
      28246: "BAFE",
      24359: "BBA1",
      34382: "BBA2",
      21804: "BBA3",
      25252: "BBA4",
      20114: "BBA5",
      27818: "BBA6",
      25143: "BBA7",
      33457: "BBA8",
      21719: "BBA9",
      21326: "BBAA",
      29502: "BBAB",
      28369: "BBAC",
      30011: "BBAD",
      21010: "BBAE",
      21270: "BBAF",
      35805: "BBB0",
      27088: "BBB1",
      24458: "BBB2",
      24576: "BBB3",
      28142: "BBB4",
      22351: "BBB5",
      27426: "BBB6",
      29615: "BBB7",
      26707: "BBB8",
      36824: "BBB9",
      32531: "BBBA",
      25442: "BBBB",
      24739: "BBBC",
      21796: "BBBD",
      30186: "BBBE",
      35938: "BBBF",
      28949: "BBC0",
      28067: "BBC1",
      23462: "BBC2",
      24187: "BBC3",
      33618: "BBC4",
      24908: "BBC5",
      40644: "BBC6",
      30970: "BBC7",
      34647: "BBC8",
      31783: "BBC9",
      30343: "BBCA",
      20976: "BBCB",
      24822: "BBCC",
      29004: "BBCD",
      26179: "BBCE",
      24140: "BBCF",
      24653: "BBD0",
      35854: "BBD1",
      28784: "BBD2",
      25381: "BBD3",
      36745: "BBD4",
      24509: "BBD5",
      24674: "BBD6",
      34516: "BBD7",
      22238: "BBD8",
      27585: "BBD9",
      24724: "BBDA",
      24935: "BBDB",
      21321: "BBDC",
      24800: "BBDD",
      26214: "BBDE",
      36159: "BBDF",
      31229: "BBE0",
      20250: "BBE1",
      28905: "BBE2",
      27719: "BBE3",
      35763: "BBE4",
      35826: "BBE5",
      32472: "BBE6",
      33636: "BBE7",
      26127: "BBE8",
      23130: "BBE9",
      39746: "BBEA",
      27985: "BBEB",
      28151: "BBEC",
      35905: "BBED",
      27963: "BBEE",
      20249: "BBEF",
      28779: "BBF0",
      33719: "BBF1",
      25110: "BBF2",
      24785: "BBF3",
      38669: "BBF4",
      36135: "BBF5",
      31096: "BBF6",
      20987: "BBF7",
      22334: "BBF8",
      22522: "BBF9",
      26426: "BBFA",
      30072: "BBFB",
      31293: "BBFC",
      31215: "BBFD",
      31637: "BBFE",
      32908: "BCA1",
      39269: "BCA2",
      36857: "BCA3",
      28608: "BCA4",
      35749: "BCA5",
      40481: "BCA6",
      23020: "BCA7",
      32489: "BCA8",
      32521: "BCA9",
      21513: "BCAA",
      26497: "BCAB",
      26840: "BCAC",
      36753: "BCAD",
      31821: "BCAE",
      38598: "BCAF",
      21450: "BCB0",
      24613: "BCB1",
      30142: "BCB2",
      27762: "BCB3",
      21363: "BCB4",
      23241: "BCB5",
      32423: "BCB6",
      25380: "BCB7",
      20960: "BCB8",
      33034: "BCB9",
      24049: "BCBA",
      34015: "BCBB",
      25216: "BCBC",
      20864: "BCBD",
      23395: "BCBE",
      20238: "BCBF",
      31085: "BCC0",
      21058: "BCC1",
      24760: "BCC2",
      27982: "BCC3",
      23492: "BCC4",
      23490: "BCC5",
      35745: "BCC6",
      35760: "BCC7",
      26082: "BCC8",
      24524: "BCC9",
      38469: "BCCA",
      22931: "BCCB",
      32487: "BCCC",
      32426: "BCCD",
      22025: "BCCE",
      26551: "BCCF",
      22841: "BCD0",
      20339: "BCD1",
      23478: "BCD2",
      21152: "BCD3",
      33626: "BCD4",
      39050: "BCD5",
      36158: "BCD6",
      30002: "BCD7",
      38078: "BCD8",
      20551: "BCD9",
      31292: "BCDA",
      20215: "BCDB",
      26550: "BCDC",
      39550: "BCDD",
      23233: "BCDE",
      27516: "BCDF",
      30417: "BCE0",
      22362: "BCE1",
      23574: "BCE2",
      31546: "BCE3",
      38388: "BCE4",
      29006: "BCE5",
      20860: "BCE6",
      32937: "BCE7",
      33392: "BCE8",
      22904: "BCE9",
      32516: "BCEA",
      33575: "BCEB",
      26816: "BCEC",
      26604: "BCED",
      30897: "BCEE",
      30839: "BCEF",
      25315: "BCF0",
      25441: "BCF1",
      31616: "BCF2",
      20461: "BCF3",
      21098: "BCF4",
      20943: "BCF5",
      33616: "BCF6",
      27099: "BCF7",
      37492: "BCF8",
      36341: "BCF9",
      36145: "BCFA",
      35265: "BCFB",
      38190: "BCFC",
      31661: "BCFD",
      20214: "BCFE",
      20581: "BDA1",
      33328: "BDA2",
      21073: "BDA3",
      39279: "BDA4",
      28176: "BDA5",
      28293: "BDA6",
      28071: "BDA7",
      24314: "BDA8",
      20725: "BDA9",
      23004: "BDAA",
      23558: "BDAB",
      27974: "BDAC",
      27743: "BDAD",
      30086: "BDAE",
      33931: "BDAF",
      26728: "BDB0",
      22870: "BDB1",
      35762: "BDB2",
      21280: "BDB3",
      37233: "BDB4",
      38477: "BDB5",
      34121: "BDB6",
      26898: "BDB7",
      30977: "BDB8",
      28966: "BDB9",
      33014: "BDBA",
      20132: "BDBB",
      37066: "BDBC",
      27975: "BDBD",
      39556: "BDBE",
      23047: "BDBF",
      22204: "BDC0",
      25605: "BDC1",
      38128: "BDC2",
      30699: "BDC3",
      20389: "BDC4",
      33050: "BDC5",
      29409: "BDC6",
      35282: "BDC7",
      39290: "BDC8",
      32564: "BDC9",
      32478: "BDCA",
      21119: "BDCB",
      25945: "BDCC",
      37237: "BDCD",
      36735: "BDCE",
      36739: "BDCF",
      21483: "BDD0",
      31382: "BDD1",
      25581: "BDD2",
      25509: "BDD3",
      30342: "BDD4",
      31224: "BDD5",
      34903: "BDD6",
      38454: "BDD7",
      25130: "BDD8",
      21163: "BDD9",
      33410: "BDDA",
      26708: "BDDB",
      26480: "BDDC",
      25463: "BDDD",
      30571: "BDDE",
      31469: "BDDF",
      27905: "BDE0",
      32467: "BDE1",
      35299: "BDE2",
      22992: "BDE3",
      25106: "BDE4",
      34249: "BDE5",
      33445: "BDE6",
      30028: "BDE7",
      20511: "BDE8",
      20171: "BDE9",
      30117: "BDEA",
      35819: "BDEB",
      23626: "BDEC",
      24062: "BDED",
      31563: "BDEE",
      26020: "BDEF",
      37329: "BDF0",
      20170: "BDF1",
      27941: "BDF2",
      35167: "BDF3",
      32039: "BDF4",
      38182: "BDF5",
      20165: "BDF6",
      35880: "BDF7",
      36827: "BDF8",
      38771: "BDF9",
      26187: "BDFA",
      31105: "BDFB",
      36817: "BDFC",
      28908: "BDFD",
      28024: "BDFE",
      23613: "BEA1",
      21170: "BEA2",
      33606: "BEA3",
      20834: "BEA4",
      33550: "BEA5",
      30555: "BEA6",
      26230: "BEA7",
      40120: "BEA8",
      20140: "BEA9",
      24778: "BEAA",
      31934: "BEAB",
      31923: "BEAC",
      32463: "BEAD",
      20117: "BEAE",
      35686: "BEAF",
      26223: "BEB0",
      39048: "BEB1",
      38745: "BEB2",
      22659: "BEB3",
      25964: "BEB4",
      38236: "BEB5",
      24452: "BEB6",
      30153: "BEB7",
      38742: "BEB8",
      31455: "BEB9",
      31454: "BEBA",
      20928: "BEBB",
      28847: "BEBC",
      31384: "BEBD",
      25578: "BEBE",
      31350: "BEBF",
      32416: "BEC0",
      29590: "BEC1",
      38893: "BEC2",
      20037: "BEC3",
      28792: "BEC4",
      20061: "BEC5",
      37202: "BEC6",
      21417: "BEC7",
      25937: "BEC8",
      26087: "BEC9",
      33276: "BECA",
      33285: "BECB",
      21646: "BECC",
      23601: "BECD",
      30106: "BECE",
      38816: "BECF",
      25304: "BED0",
      29401: "BED1",
      30141: "BED2",
      23621: "BED3",
      39545: "BED4",
      33738: "BED5",
      23616: "BED6",
      21632: "BED7",
      30697: "BED8",
      20030: "BED9",
      27822: "BEDA",
      32858: "BEDB",
      25298: "BEDC",
      25454: "BEDD",
      24040: "BEDE",
      20855: "BEDF",
      36317: "BEE0",
      36382: "BEE1",
      38191: "BEE2",
      20465: "BEE3",
      21477: "BEE4",
      24807: "BEE5",
      28844: "BEE6",
      21095: "BEE7",
      25424: "BEE8",
      40515: "BEE9",
      23071: "BEEA",
      20518: "BEEB",
      30519: "BEEC",
      21367: "BEED",
      32482: "BEEE",
      25733: "BEEF",
      25899: "BEF0",
      25225: "BEF1",
      25496: "BEF2",
      20500: "BEF3",
      29237: "BEF4",
      35273: "BEF5",
      20915: "BEF6",
      35776: "BEF7",
      32477: "BEF8",
      22343: "BEF9",
      33740: "BEFA",
      38055: "BEFB",
      20891: "BEFC",
      21531: "BEFD",
      23803: "BEFE",
      20426: "BFA1",
      31459: "BFA2",
      27994: "BFA3",
      37089: "BFA4",
      39567: "BFA5",
      21888: "BFA6",
      21654: "BFA7",
      21345: "BFA8",
      21679: "BFA9",
      24320: "BFAA",
      25577: "BFAB",
      26999: "BFAC",
      20975: "BFAD",
      24936: "BFAE",
      21002: "BFAF",
      22570: "BFB0",
      21208: "BFB1",
      22350: "BFB2",
      30733: "BFB3",
      30475: "BFB4",
      24247: "BFB5",
      24951: "BFB6",
      31968: "BFB7",
      25179: "BFB8",
      25239: "BFB9",
      20130: "BFBA",
      28821: "BFBB",
      32771: "BFBC",
      25335: "BFBD",
      28900: "BFBE",
      38752: "BFBF",
      22391: "BFC0",
      33499: "BFC1",
      26607: "BFC2",
      26869: "BFC3",
      30933: "BFC4",
      39063: "BFC5",
      31185: "BFC6",
      22771: "BFC7",
      21683: "BFC8",
      21487: "BFC9",
      28212: "BFCA",
      20811: "BFCB",
      21051: "BFCC",
      23458: "BFCD",
      35838: "BFCE",
      32943: "BFCF",
      21827: "BFD0",
      22438: "BFD1",
      24691: "BFD2",
      22353: "BFD3",
      21549: "BFD4",
      31354: "BFD5",
      24656: "BFD6",
      23380: "BFD7",
      25511: "BFD8",
      25248: "BFD9",
      21475: "BFDA",
      25187: "BFDB",
      23495: "BFDC",
      26543: "BFDD",
      21741: "BFDE",
      31391: "BFDF",
      33510: "BFE0",
      37239: "BFE1",
      24211: "BFE2",
      35044: "BFE3",
      22840: "BFE4",
      22446: "BFE5",
      25358: "BFE6",
      36328: "BFE7",
      33007: "BFE8",
      22359: "BFE9",
      31607: "BFEA",
      20393: "BFEB",
      24555: "BFEC",
      23485: "BFED",
      27454: "BFEE",
      21281: "BFEF",
      31568: "BFF0",
      29378: "BFF1",
      26694: "BFF2",
      30719: "BFF3",
      30518: "BFF4",
      26103: "BFF5",
      20917: "BFF6",
      20111: "BFF7",
      30420: "BFF8",
      23743: "BFF9",
      31397: "BFFA",
      33909: "BFFB",
      22862: "BFFC",
      39745: "BFFD",
      20608: "BFFE",
      39304: "C0A1",
      24871: "C0A2",
      28291: "C0A3",
      22372: "C0A4",
      26118: "C0A5",
      25414: "C0A6",
      22256: "C0A7",
      25324: "C0A8",
      25193: "C0A9",
      24275: "C0AA",
      38420: "C0AB",
      22403: "C0AC",
      25289: "C0AD",
      21895: "C0AE",
      34593: "C0AF",
      33098: "C0B0",
      36771: "C0B1",
      21862: "C0B2",
      33713: "C0B3",
      26469: "C0B4",
      36182: "C0B5",
      34013: "C0B6",
      23146: "C0B7",
      26639: "C0B8",
      25318: "C0B9",
      31726: "C0BA",
      38417: "C0BB",
      20848: "C0BC",
      28572: "C0BD",
      35888: "C0BE",
      25597: "C0BF",
      35272: "C0C0",
      25042: "C0C1",
      32518: "C0C2",
      28866: "C0C3",
      28389: "C0C4",
      29701: "C0C5",
      27028: "C0C6",
      29436: "C0C7",
      24266: "C0C8",
      37070: "C0C9",
      26391: "C0CA",
      28010: "C0CB",
      25438: "C0CC",
      21171: "C0CD",
      29282: "C0CE",
      32769: "C0CF",
      20332: "C0D0",
      23013: "C0D1",
      37226: "C0D2",
      28889: "C0D3",
      28061: "C0D4",
      21202: "C0D5",
      20048: "C0D6",
      38647: "C0D7",
      38253: "C0D8",
      34174: "C0D9",
      30922: "C0DA",
      32047: "C0DB",
      20769: "C0DC",
      22418: "C0DD",
      25794: "C0DE",
      32907: "C0DF",
      31867: "C0E0",
      27882: "C0E1",
      26865: "C0E2",
      26974: "C0E3",
      20919: "C0E4",
      21400: "C0E5",
      26792: "C0E6",
      29313: "C0E7",
      40654: "C0E8",
      31729: "C0E9",
      29432: "C0EA",
      31163: "C0EB",
      28435: "C0EC",
      29702: "C0ED",
      26446: "C0EE",
      37324: "C0EF",
      40100: "C0F0",
      31036: "C0F1",
      33673: "C0F2",
      33620: "C0F3",
      21519: "C0F4",
      26647: "C0F5",
      20029: "C0F6",
      21385: "C0F7",
      21169: "C0F8",
      30782: "C0F9",
      21382: "C0FA",
      21033: "C0FB",
      20616: "C0FC",
      20363: "C0FD",
      20432: "C0FE",
      30178: "C1A1",
      31435: "C1A2",
      31890: "C1A3",
      27813: "C1A4",
      38582: "C1A5",
      21147: "C1A6",
      29827: "C1A7",
      21737: "C1A8",
      20457: "C1A9",
      32852: "C1AA",
      33714: "C1AB",
      36830: "C1AC",
      38256: "C1AD",
      24265: "C1AE",
      24604: "C1AF",
      28063: "C1B0",
      24088: "C1B1",
      25947: "C1B2",
      33080: "C1B3",
      38142: "C1B4",
      24651: "C1B5",
      28860: "C1B6",
      32451: "C1B7",
      31918: "C1B8",
      20937: "C1B9",
      26753: "C1BA",
      31921: "C1BB",
      33391: "C1BC",
      20004: "C1BD",
      36742: "C1BE",
      37327: "C1BF",
      26238: "C1C0",
      20142: "C1C1",
      35845: "C1C2",
      25769: "C1C3",
      32842: "C1C4",
      20698: "C1C5",
      30103: "C1C6",
      29134: "C1C7",
      23525: "C1C8",
      36797: "C1C9",
      28518: "C1CA",
      20102: "C1CB",
      25730: "C1CC",
      38243: "C1CD",
      24278: "C1CE",
      26009: "C1CF",
      21015: "C1D0",
      35010: "C1D1",
      28872: "C1D2",
      21155: "C1D3",
      29454: "C1D4",
      29747: "C1D5",
      26519: "C1D6",
      30967: "C1D7",
      38678: "C1D8",
      20020: "C1D9",
      37051: "C1DA",
      40158: "C1DB",
      28107: "C1DC",
      20955: "C1DD",
      36161: "C1DE",
      21533: "C1DF",
      25294: "C1E0",
      29618: "C1E1",
      33777: "C1E2",
      38646: "C1E3",
      40836: "C1E4",
      38083: "C1E5",
      20278: "C1E6",
      32666: "C1E7",
      20940: "C1E8",
      28789: "C1E9",
      38517: "C1EA",
      23725: "C1EB",
      39046: "C1EC",
      21478: "C1ED",
      20196: "C1EE",
      28316: "C1EF",
      29705: "C1F0",
      27060: "C1F1",
      30827: "C1F2",
      39311: "C1F3",
      30041: "C1F4",
      21016: "C1F5",
      30244: "C1F6",
      27969: "C1F7",
      26611: "C1F8",
      20845: "C1F9",
      40857: "C1FA",
      32843: "C1FB",
      21657: "C1FC",
      31548: "C1FD",
      31423: "C1FE",
      38534: "C2A1",
      22404: "C2A2",
      25314: "C2A3",
      38471: "C2A4",
      27004: "C2A5",
      23044: "C2A6",
      25602: "C2A7",
      31699: "C2A8",
      28431: "C2A9",
      38475: "C2AA",
      33446: "C2AB",
      21346: "C2AC",
      39045: "C2AD",
      24208: "C2AE",
      28809: "C2AF",
      25523: "C2B0",
      21348: "C2B1",
      34383: "C2B2",
      40065: "C2B3",
      40595: "C2B4",
      30860: "C2B5",
      38706: "C2B6",
      36335: "C2B7",
      36162: "C2B8",
      40575: "C2B9",
      28510: "C2BA",
      31108: "C2BB",
      24405: "C2BC",
      38470: "C2BD",
      25134: "C2BE",
      39540: "C2BF",
      21525: "C2C0",
      38109: "C2C1",
      20387: "C2C2",
      26053: "C2C3",
      23653: "C2C4",
      23649: "C2C5",
      32533: "C2C6",
      34385: "C2C7",
      27695: "C2C8",
      24459: "C2C9",
      29575: "C2CA",
      28388: "C2CB",
      32511: "C2CC",
      23782: "C2CD",
      25371: "C2CE",
      23402: "C2CF",
      28390: "C2D0",
      21365: "C2D1",
      20081: "C2D2",
      25504: "C2D3",
      30053: "C2D4",
      25249: "C2D5",
      36718: "C2D6",
      20262: "C2D7",
      20177: "C2D8",
      27814: "C2D9",
      32438: "C2DA",
      35770: "C2DB",
      33821: "C2DC",
      34746: "C2DD",
      32599: "C2DE",
      36923: "C2DF",
      38179: "C2E0",
      31657: "C2E1",
      39585: "C2E2",
      35064: "C2E3",
      33853: "C2E4",
      27931: "C2E5",
      39558: "C2E6",
      32476: "C2E7",
      22920: "C2E8",
      40635: "C2E9",
      29595: "C2EA",
      30721: "C2EB",
      34434: "C2EC",
      39532: "C2ED",
      39554: "C2EE",
      22043: "C2EF",
      21527: "C2F0",
      22475: "C2F1",
      20080: "C2F2",
      40614: "C2F3",
      21334: "C2F4",
      36808: "C2F5",
      33033: "C2F6",
      30610: "C2F7",
      39314: "C2F8",
      34542: "C2F9",
      28385: "C2FA",
      34067: "C2FB",
      26364: "C2FC",
      24930: "C2FD",
      28459: "C2FE",
      35881: "C3A1",
      33426: "C3A2",
      33579: "C3A3",
      30450: "C3A4",
      27667: "C3A5",
      24537: "C3A6",
      33725: "C3A7",
      29483: "C3A8",
      33541: "C3A9",
      38170: "C3AA",
      27611: "C3AB",
      30683: "C3AC",
      38086: "C3AD",
      21359: "C3AE",
      33538: "C3AF",
      20882: "C3B0",
      24125: "C3B1",
      35980: "C3B2",
      36152: "C3B3",
      20040: "C3B4",
      29611: "C3B5",
      26522: "C3B6",
      26757: "C3B7",
      37238: "C3B8",
      38665: "C3B9",
      29028: "C3BA",
      27809: "C3BB",
      30473: "C3BC",
      23186: "C3BD",
      38209: "C3BE",
      27599: "C3BF",
      32654: "C3C0",
      26151: "C3C1",
      23504: "C3C2",
      22969: "C3C3",
      23194: "C3C4",
      38376: "C3C5",
      38391: "C3C6",
      20204: "C3C7",
      33804: "C3C8",
      33945: "C3C9",
      27308: "C3CA",
      30431: "C3CB",
      38192: "C3CC",
      29467: "C3CD",
      26790: "C3CE",
      23391: "C3CF",
      30511: "C3D0",
      37274: "C3D1",
      38753: "C3D2",
      31964: "C3D3",
      36855: "C3D4",
      35868: "C3D5",
      24357: "C3D6",
      31859: "C3D7",
      31192: "C3D8",
      35269: "C3D9",
      27852: "C3DA",
      34588: "C3DB",
      23494: "C3DC",
      24130: "C3DD",
      26825: "C3DE",
      30496: "C3DF",
      32501: "C3E0",
      20885: "C3E1",
      20813: "C3E2",
      21193: "C3E3",
      23081: "C3E4",
      32517: "C3E5",
      38754: "C3E6",
      33495: "C3E7",
      25551: "C3E8",
      30596: "C3E9",
      34256: "C3EA",
      31186: "C3EB",
      28218: "C3EC",
      24217: "C3ED",
      22937: "C3EE",
      34065: "C3EF",
      28781: "C3F0",
      27665: "C3F1",
      25279: "C3F2",
      30399: "C3F3",
      25935: "C3F4",
      24751: "C3F5",
      38397: "C3F6",
      26126: "C3F7",
      34719: "C3F8",
      40483: "C3F9",
      38125: "C3FA",
      21517: "C3FB",
      21629: "C3FC",
      35884: "C3FD",
      25720: "C3FE",
      25721: "C4A1",
      34321: "C4A2",
      27169: "C4A3",
      33180: "C4A4",
      30952: "C4A5",
      25705: "C4A6",
      39764: "C4A7",
      25273: "C4A8",
      26411: "C4A9",
      33707: "C4AA",
      22696: "C4AB",
      40664: "C4AC",
      27819: "C4AD",
      28448: "C4AE",
      23518: "C4AF",
      38476: "C4B0",
      35851: "C4B1",
      29279: "C4B2",
      26576: "C4B3",
      25287: "C4B4",
      29281: "C4B5",
      20137: "C4B6",
      22982: "C4B7",
      27597: "C4B8",
      22675: "C4B9",
      26286: "C4BA",
      24149: "C4BB",
      21215: "C4BC",
      24917: "C4BD",
      26408: "C4BE",
      30446: "C4BF",
      30566: "C4C0",
      29287: "C4C1",
      31302: "C4C2",
      25343: "C4C3",
      21738: "C4C4",
      21584: "C4C5",
      38048: "C4C6",
      37027: "C4C7",
      23068: "C4C8",
      32435: "C4C9",
      27670: "C4CA",
      20035: "C4CB",
      22902: "C4CC",
      32784: "C4CD",
      22856: "C4CE",
      21335: "C4CF",
      30007: "C4D0",
      38590: "C4D1",
      22218: "C4D2",
      25376: "C4D3",
      33041: "C4D4",
      24700: "C4D5",
      38393: "C4D6",
      28118: "C4D7",
      21602: "C4D8",
      39297: "C4D9",
      20869: "C4DA",
      23273: "C4DB",
      33021: "C4DC",
      22958: "C4DD",
      38675: "C4DE",
      20522: "C4DF",
      27877: "C4E0",
      23612: "C4E1",
      25311: "C4E2",
      20320: "C4E3",
      21311: "C4E4",
      33147: "C4E5",
      36870: "C4E6",
      28346: "C4E7",
      34091: "C4E8",
      25288: "C4E9",
      24180: "C4EA",
      30910: "C4EB",
      25781: "C4EC",
      25467: "C4ED",
      24565: "C4EE",
      23064: "C4EF",
      37247: "C4F0",
      40479: "C4F1",
      23615: "C4F2",
      25423: "C4F3",
      32834: "C4F4",
      23421: "C4F5",
      21870: "C4F6",
      38218: "C4F7",
      38221: "C4F8",
      28037: "C4F9",
      24744: "C4FA",
      26592: "C4FB",
      29406: "C4FC",
      20957: "C4FD",
      23425: "C4FE",
      25319: "C5A1",
      27870: "C5A2",
      29275: "C5A3",
      25197: "C5A4",
      38062: "C5A5",
      32445: "C5A6",
      33043: "C5A7",
      27987: "C5A8",
      20892: "C5A9",
      24324: "C5AA",
      22900: "C5AB",
      21162: "C5AC",
      24594: "C5AD",
      22899: "C5AE",
      26262: "C5AF",
      34384: "C5B0",
      30111: "C5B1",
      25386: "C5B2",
      25062: "C5B3",
      31983: "C5B4",
      35834: "C5B5",
      21734: "C5B6",
      27431: "C5B7",
      40485: "C5B8",
      27572: "C5B9",
      34261: "C5BA",
      21589: "C5BB",
      20598: "C5BC",
      27812: "C5BD",
      21866: "C5BE",
      36276: "C5BF",
      29228: "C5C0",
      24085: "C5C1",
      24597: "C5C2",
      29750: "C5C3",
      25293: "C5C4",
      25490: "C5C5",
      29260: "C5C6",
      24472: "C5C7",
      28227: "C5C8",
      27966: "C5C9",
      25856: "C5CA",
      28504: "C5CB",
      30424: "C5CC",
      30928: "C5CD",
      30460: "C5CE",
      30036: "C5CF",
      21028: "C5D0",
      21467: "C5D1",
      20051: "C5D2",
      24222: "C5D3",
      26049: "C5D4",
      32810: "C5D5",
      32982: "C5D6",
      25243: "C5D7",
      21638: "C5D8",
      21032: "C5D9",
      28846: "C5DA",
      34957: "C5DB",
      36305: "C5DC",
      27873: "C5DD",
      21624: "C5DE",
      32986: "C5DF",
      22521: "C5E0",
      35060: "C5E1",
      36180: "C5E2",
      38506: "C5E3",
      37197: "C5E4",
      20329: "C5E5",
      27803: "C5E6",
      21943: "C5E7",
      30406: "C5E8",
      30768: "C5E9",
      25256: "C5EA",
      28921: "C5EB",
      28558: "C5EC",
      24429: "C5ED",
      34028: "C5EE",
      26842: "C5EF",
      30844: "C5F0",
      31735: "C5F1",
      33192: "C5F2",
      26379: "C5F3",
      40527: "C5F4",
      25447: "C5F5",
      30896: "C5F6",
      22383: "C5F7",
      30738: "C5F8",
      38713: "C5F9",
      25209: "C5FA",
      25259: "C5FB",
      21128: "C5FC",
      29749: "C5FD",
      27607: "C5FE",
      21860: "C6A1",
      33086: "C6A2",
      30130: "C6A3",
      30382: "C6A4",
      21305: "C6A5",
      30174: "C6A6",
      20731: "C6A7",
      23617: "C6A8",
      35692: "C6A9",
      31687: "C6AA",
      20559: "C6AB",
      29255: "C6AC",
      39575: "C6AD",
      39128: "C6AE",
      28418: "C6AF",
      29922: "C6B0",
      31080: "C6B1",
      25735: "C6B2",
      30629: "C6B3",
      25340: "C6B4",
      39057: "C6B5",
      36139: "C6B6",
      21697: "C6B7",
      32856: "C6B8",
      20050: "C6B9",
      22378: "C6BA",
      33529: "C6BB",
      33805: "C6BC",
      24179: "C6BD",
      20973: "C6BE",
      29942: "C6BF",
      35780: "C6C0",
      23631: "C6C1",
      22369: "C6C2",
      27900: "C6C3",
      39047: "C6C4",
      23110: "C6C5",
      30772: "C6C6",
      39748: "C6C7",
      36843: "C6C8",
      31893: "C6C9",
      21078: "C6CA",
      25169: "C6CB",
      38138: "C6CC",
      20166: "C6CD",
      33670: "C6CE",
      33889: "C6CF",
      33769: "C6D0",
      33970: "C6D1",
      22484: "C6D2",
      26420: "C6D3",
      22275: "C6D4",
      26222: "C6D5",
      28006: "C6D6",
      35889: "C6D7",
      26333: "C6D8",
      28689: "C6D9",
      26399: "C6DA",
      27450: "C6DB",
      26646: "C6DC",
      25114: "C6DD",
      22971: "C6DE",
      19971: "C6DF",
      20932: "C6E0",
      28422: "C6E1",
      26578: "C6E2",
      27791: "C6E3",
      20854: "C6E4",
      26827: "C6E5",
      22855: "C6E6",
      27495: "C6E7",
      30054: "C6E8",
      23822: "C6E9",
      33040: "C6EA",
      40784: "C6EB",
      26071: "C6EC",
      31048: "C6ED",
      31041: "C6EE",
      39569: "C6EF",
      36215: "C6F0",
      23682: "C6F1",
      20062: "C6F2",
      20225: "C6F3",
      21551: "C6F4",
      22865: "C6F5",
      30732: "C6F6",
      22120: "C6F7",
      27668: "C6F8",
      36804: "C6F9",
      24323: "C6FA",
      27773: "C6FB",
      27875: "C6FC",
      35755: "C6FD",
      25488: "C6FE",
      24688: "C7A1",
      27965: "C7A2",
      29301: "C7A3",
      25190: "C7A4",
      38030: "C7A5",
      38085: "C7A6",
      21315: "C7A7",
      36801: "C7A8",
      31614: "C7A9",
      20191: "C7AA",
      35878: "C7AB",
      20094: "C7AC",
      40660: "C7AD",
      38065: "C7AE",
      38067: "C7AF",
      21069: "C7B0",
      28508: "C7B1",
      36963: "C7B2",
      27973: "C7B3",
      35892: "C7B4",
      22545: "C7B5",
      23884: "C7B6",
      27424: "C7B7",
      27465: "C7B8",
      26538: "C7B9",
      21595: "C7BA",
      33108: "C7BB",
      32652: "C7BC",
      22681: "C7BD",
      34103: "C7BE",
      24378: "C7BF",
      25250: "C7C0",
      27207: "C7C1",
      38201: "C7C2",
      25970: "C7C3",
      24708: "C7C4",
      26725: "C7C5",
      30631: "C7C6",
      20052: "C7C7",
      20392: "C7C8",
      24039: "C7C9",
      38808: "C7CA",
      25772: "C7CB",
      32728: "C7CC",
      23789: "C7CD",
      20431: "C7CE",
      31373: "C7CF",
      20999: "C7D0",
      33540: "C7D1",
      19988: "C7D2",
      24623: "C7D3",
      31363: "C7D4",
      38054: "C7D5",
      20405: "C7D6",
      20146: "C7D7",
      31206: "C7D8",
      29748: "C7D9",
      21220: "C7DA",
      33465: "C7DB",
      25810: "C7DC",
      31165: "C7DD",
      23517: "C7DE",
      27777: "C7DF",
      38738: "C7E0",
      36731: "C7E1",
      27682: "C7E2",
      20542: "C7E3",
      21375: "C7E4",
      28165: "C7E5",
      25806: "C7E6",
      26228: "C7E7",
      27696: "C7E8",
      24773: "C7E9",
      39031: "C7EA",
      35831: "C7EB",
      24198: "C7EC",
      29756: "C7ED",
      31351: "C7EE",
      31179: "C7EF",
      19992: "C7F0",
      37041: "C7F1",
      29699: "C7F2",
      27714: "C7F3",
      22234: "C7F4",
      37195: "C7F5",
      27845: "C7F6",
      36235: "C7F7",
      21306: "C7F8",
      34502: "C7F9",
      26354: "C7FA",
      36527: "C7FB",
      23624: "C7FC",
      39537: "C7FD",
      28192: "C7FE",
      21462: "C8A1",
      23094: "C8A2",
      40843: "C8A3",
      36259: "C8A4",
      21435: "C8A5",
      22280: "C8A6",
      39079: "C8A7",
      26435: "C8A8",
      37275: "C8A9",
      27849: "C8AA",
      20840: "C8AB",
      30154: "C8AC",
      25331: "C8AD",
      29356: "C8AE",
      21048: "C8AF",
      21149: "C8B0",
      32570: "C8B1",
      28820: "C8B2",
      30264: "C8B3",
      21364: "C8B4",
      40522: "C8B5",
      27063: "C8B6",
      30830: "C8B7",
      38592: "C8B8",
      35033: "C8B9",
      32676: "C8BA",
      28982: "C8BB",
      29123: "C8BC",
      20873: "C8BD",
      26579: "C8BE",
      29924: "C8BF",
      22756: "C8C0",
      25880: "C8C1",
      22199: "C8C2",
      35753: "C8C3",
      39286: "C8C4",
      25200: "C8C5",
      32469: "C8C6",
      24825: "C8C7",
      28909: "C8C8",
      22764: "C8C9",
      20161: "C8CA",
      20154: "C8CB",
      24525: "C8CC",
      38887: "C8CD",
      20219: "C8CE",
      35748: "C8CF",
      20995: "C8D0",
      22922: "C8D1",
      32427: "C8D2",
      25172: "C8D3",
      20173: "C8D4",
      26085: "C8D5",
      25102: "C8D6",
      33592: "C8D7",
      33993: "C8D8",
      33635: "C8D9",
      34701: "C8DA",
      29076: "C8DB",
      28342: "C8DC",
      23481: "C8DD",
      32466: "C8DE",
      20887: "C8DF",
      25545: "C8E0",
      26580: "C8E1",
      32905: "C8E2",
      33593: "C8E3",
      34837: "C8E4",
      20754: "C8E5",
      23418: "C8E6",
      22914: "C8E7",
      36785: "C8E8",
      20083: "C8E9",
      27741: "C8EA",
      20837: "C8EB",
      35109: "C8EC",
      36719: "C8ED",
      38446: "C8EE",
      34122: "C8EF",
      29790: "C8F0",
      38160: "C8F1",
      38384: "C8F2",
      28070: "C8F3",
      33509: "C8F4",
      24369: "C8F5",
      25746: "C8F6",
      27922: "C8F7",
      33832: "C8F8",
      33134: "C8F9",
      40131: "C8FA",
      22622: "C8FB",
      36187: "C8FC",
      19977: "C8FD",
      21441: "C8FE",
      20254: "C9A1",
      25955: "C9A2",
      26705: "C9A3",
      21971: "C9A4",
      20007: "C9A5",
      25620: "C9A6",
      39578: "C9A7",
      25195: "C9A8",
      23234: "C9A9",
      29791: "C9AA",
      33394: "C9AB",
      28073: "C9AC",
      26862: "C9AD",
      20711: "C9AE",
      33678: "C9AF",
      30722: "C9B0",
      26432: "C9B1",
      21049: "C9B2",
      27801: "C9B3",
      32433: "C9B4",
      20667: "C9B5",
      21861: "C9B6",
      29022: "C9B7",
      31579: "C9B8",
      26194: "C9B9",
      29642: "C9BA",
      33515: "C9BB",
      26441: "C9BC",
      23665: "C9BD",
      21024: "C9BE",
      29053: "C9BF",
      34923: "C9C0",
      38378: "C9C1",
      38485: "C9C2",
      25797: "C9C3",
      36193: "C9C4",
      33203: "C9C5",
      21892: "C9C6",
      27733: "C9C7",
      25159: "C9C8",
      32558: "C9C9",
      22674: "C9CA",
      20260: "C9CB",
      21830: "C9CC",
      36175: "C9CD",
      26188: "C9CE",
      19978: "C9CF",
      23578: "C9D0",
      35059: "C9D1",
      26786: "C9D2",
      25422: "C9D3",
      31245: "C9D4",
      28903: "C9D5",
      33421: "C9D6",
      21242: "C9D7",
      38902: "C9D8",
      23569: "C9D9",
      21736: "C9DA",
      37045: "C9DB",
      32461: "C9DC",
      22882: "C9DD",
      36170: "C9DE",
      34503: "C9DF",
      33292: "C9E0",
      33293: "C9E1",
      36198: "C9E2",
      25668: "C9E3",
      23556: "C9E4",
      24913: "C9E5",
      28041: "C9E6",
      31038: "C9E7",
      35774: "C9E8",
      30775: "C9E9",
      30003: "C9EA",
      21627: "C9EB",
      20280: "C9EC",
      36523: "C9ED",
      28145: "C9EE",
      23072: "C9EF",
      32453: "C9F0",
      31070: "C9F1",
      27784: "C9F2",
      23457: "C9F3",
      23158: "C9F4",
      29978: "C9F5",
      32958: "C9F6",
      24910: "C9F7",
      28183: "C9F8",
      22768: "C9F9",
      29983: "C9FA",
      29989: "C9FB",
      29298: "C9FC",
      21319: "C9FD",
      32499: "C9FE",
      30465: "CAA1",
      30427: "CAA2",
      21097: "CAA3",
      32988: "CAA4",
      22307: "CAA5",
      24072: "CAA6",
      22833: "CAA7",
      29422: "CAA8",
      26045: "CAA9",
      28287: "CAAA",
      35799: "CAAB",
      23608: "CAAC",
      34417: "CAAD",
      21313: "CAAE",
      30707: "CAAF",
      25342: "CAB0",
      26102: "CAB1",
      20160: "CAB2",
      39135: "CAB3",
      34432: "CAB4",
      23454: "CAB5",
      35782: "CAB6",
      21490: "CAB7",
      30690: "CAB8",
      20351: "CAB9",
      23630: "CABA",
      39542: "CABB",
      22987: "CABC",
      24335: "CABD",
      31034: "CABE",
      22763: "CABF",
      19990: "CAC0",
      26623: "CAC1",
      20107: "CAC2",
      25325: "CAC3",
      35475: "CAC4",
      36893: "CAC5",
      21183: "CAC6",
      26159: "CAC7",
      21980: "CAC8",
      22124: "CAC9",
      36866: "CACA",
      20181: "CACB",
      20365: "CACC",
      37322: "CACD",
      39280: "CACE",
      27663: "CACF",
      24066: "CAD0",
      24643: "CAD1",
      23460: "CAD2",
      35270: "CAD3",
      35797: "CAD4",
      25910: "CAD5",
      25163: "CAD6",
      39318: "CAD7",
      23432: "CAD8",
      23551: "CAD9",
      25480: "CADA",
      21806: "CADB",
      21463: "CADC",
      30246: "CADD",
      20861: "CADE",
      34092: "CADF",
      26530: "CAE0",
      26803: "CAE1",
      27530: "CAE2",
      25234: "CAE3",
      36755: "CAE4",
      21460: "CAE5",
      33298: "CAE6",
      28113: "CAE7",
      30095: "CAE8",
      20070: "CAE9",
      36174: "CAEA",
      23408: "CAEB",
      29087: "CAEC",
      34223: "CAED",
      26257: "CAEE",
      26329: "CAEF",
      32626: "CAF0",
      34560: "CAF1",
      40653: "CAF2",
      40736: "CAF3",
      23646: "CAF4",
      26415: "CAF5",
      36848: "CAF6",
      26641: "CAF7",
      26463: "CAF8",
      25101: "CAF9",
      31446: "CAFA",
      22661: "CAFB",
      24246: "CAFC",
      25968: "CAFD",
      28465: "CAFE",
      24661: "CBA1",
      21047: "CBA2",
      32781: "CBA3",
      25684: "CBA4",
      34928: "CBA5",
      29993: "CBA6",
      24069: "CBA7",
      26643: "CBA8",
      25332: "CBA9",
      38684: "CBAA",
      21452: "CBAB",
      29245: "CBAC",
      35841: "CBAD",
      27700: "CBAE",
      30561: "CBAF",
      31246: "CBB0",
      21550: "CBB1",
      30636: "CBB2",
      39034: "CBB3",
      33308: "CBB4",
      35828: "CBB5",
      30805: "CBB6",
      26388: "CBB7",
      28865: "CBB8",
      26031: "CBB9",
      25749: "CBBA",
      22070: "CBBB",
      24605: "CBBC",
      31169: "CBBD",
      21496: "CBBE",
      19997: "CBBF",
      27515: "CBC0",
      32902: "CBC1",
      23546: "CBC2",
      21987: "CBC3",
      22235: "CBC4",
      20282: "CBC5",
      20284: "CBC6",
      39282: "CBC7",
      24051: "CBC8",
      26494: "CBC9",
      32824: "CBCA",
      24578: "CBCB",
      39042: "CBCC",
      36865: "CBCD",
      23435: "CBCE",
      35772: "CBCF",
      35829: "CBD0",
      25628: "CBD1",
      33368: "CBD2",
      25822: "CBD3",
      22013: "CBD4",
      33487: "CBD5",
      37221: "CBD6",
      20439: "CBD7",
      32032: "CBD8",
      36895: "CBD9",
      31903: "CBDA",
      20723: "CBDB",
      22609: "CBDC",
      28335: "CBDD",
      23487: "CBDE",
      35785: "CBDF",
      32899: "CBE0",
      37240: "CBE1",
      33948: "CBE2",
      31639: "CBE3",
      34429: "CBE4",
      38539: "CBE5",
      38543: "CBE6",
      32485: "CBE7",
      39635: "CBE8",
      30862: "CBE9",
      23681: "CBEA",
      31319: "CBEB",
      36930: "CBEC",
      38567: "CBED",
      31071: "CBEE",
      23385: "CBEF",
      25439: "CBF0",
      31499: "CBF1",
      34001: "CBF2",
      26797: "CBF3",
      21766: "CBF4",
      32553: "CBF5",
      29712: "CBF6",
      32034: "CBF7",
      38145: "CBF8",
      25152: "CBF9",
      22604: "CBFA",
      20182: "CBFB",
      23427: "CBFC",
      22905: "CBFD",
      22612: "CBFE",
      29549: "CCA1",
      25374: "CCA2",
      36427: "CCA3",
      36367: "CCA4",
      32974: "CCA5",
      33492: "CCA6",
      25260: "CCA7",
      21488: "CCA8",
      27888: "CCA9",
      37214: "CCAA",
      22826: "CCAB",
      24577: "CCAC",
      27760: "CCAD",
      22349: "CCAE",
      25674: "CCAF",
      36138: "CCB0",
      30251: "CCB1",
      28393: "CCB2",
      22363: "CCB3",
      27264: "CCB4",
      30192: "CCB5",
      28525: "CCB6",
      35885: "CCB7",
      35848: "CCB8",
      22374: "CCB9",
      27631: "CCBA",
      34962: "CCBB",
      30899: "CCBC",
      25506: "CCBD",
      21497: "CCBE",
      28845: "CCBF",
      27748: "CCC0",
      22616: "CCC1",
      25642: "CCC2",
      22530: "CCC3",
      26848: "CCC4",
      33179: "CCC5",
      21776: "CCC6",
      31958: "CCC7",
      20504: "CCC8",
      36538: "CCC9",
      28108: "CCCA",
      36255: "CCCB",
      28907: "CCCC",
      25487: "CCCD",
      28059: "CCCE",
      28372: "CCCF",
      32486: "CCD0",
      33796: "CCD1",
      26691: "CCD2",
      36867: "CCD3",
      28120: "CCD4",
      38518: "CCD5",
      35752: "CCD6",
      22871: "CCD7",
      29305: "CCD8",
      34276: "CCD9",
      33150: "CCDA",
      30140: "CCDB",
      35466: "CCDC",
      26799: "CCDD",
      21076: "CCDE",
      36386: "CCDF",
      38161: "CCE0",
      25552: "CCE1",
      39064: "CCE2",
      36420: "CCE3",
      21884: "CCE4",
      20307: "CCE5",
      26367: "CCE6",
      22159: "CCE7",
      24789: "CCE8",
      28053: "CCE9",
      21059: "CCEA",
      23625: "CCEB",
      22825: "CCEC",
      28155: "CCED",
      22635: "CCEE",
      3e4: "CCEF",
      29980: "CCF0",
      24684: "CCF1",
      33300: "CCF2",
      33094: "CCF3",
      25361: "CCF4",
      26465: "CCF5",
      36834: "CCF6",
      30522: "CCF7",
      36339: "CCF8",
      36148: "CCF9",
      38081: "CCFA",
      24086: "CCFB",
      21381: "CCFC",
      21548: "CCFD",
      28867: "CCFE",
      27712: "CDA1",
      24311: "CDA2",
      20572: "CDA3",
      20141: "CDA4",
      24237: "CDA5",
      25402: "CDA6",
      33351: "CDA7",
      36890: "CDA8",
      26704: "CDA9",
      37230: "CDAA",
      30643: "CDAB",
      21516: "CDAC",
      38108: "CDAD",
      24420: "CDAE",
      31461: "CDAF",
      26742: "CDB0",
      25413: "CDB1",
      31570: "CDB2",
      32479: "CDB3",
      30171: "CDB4",
      20599: "CDB5",
      25237: "CDB6",
      22836: "CDB7",
      36879: "CDB8",
      20984: "CDB9",
      31171: "CDBA",
      31361: "CDBB",
      22270: "CDBC",
      24466: "CDBD",
      36884: "CDBE",
      28034: "CDBF",
      23648: "CDC0",
      22303: "CDC1",
      21520: "CDC2",
      20820: "CDC3",
      28237: "CDC4",
      22242: "CDC5",
      25512: "CDC6",
      39059: "CDC7",
      33151: "CDC8",
      34581: "CDC9",
      35114: "CDCA",
      36864: "CDCB",
      21534: "CDCC",
      23663: "CDCD",
      33216: "CDCE",
      25302: "CDCF",
      25176: "CDD0",
      33073: "CDD1",
      40501: "CDD2",
      38464: "CDD3",
      39534: "CDD4",
      39548: "CDD5",
      26925: "CDD6",
      22949: "CDD7",
      25299: "CDD8",
      21822: "CDD9",
      25366: "CDDA",
      21703: "CDDB",
      34521: "CDDC",
      27964: "CDDD",
      23043: "CDDE",
      29926: "CDDF",
      34972: "CDE0",
      27498: "CDE1",
      22806: "CDE2",
      35916: "CDE3",
      24367: "CDE4",
      28286: "CDE5",
      29609: "CDE6",
      39037: "CDE7",
      20024: "CDE8",
      28919: "CDE9",
      23436: "CDEA",
      30871: "CDEB",
      25405: "CDEC",
      26202: "CDED",
      30358: "CDEE",
      24779: "CDEF",
      23451: "CDF0",
      23113: "CDF1",
      19975: "CDF2",
      33109: "CDF3",
      27754: "CDF4",
      29579: "CDF5",
      20129: "CDF6",
      26505: "CDF7",
      32593: "CDF8",
      24448: "CDF9",
      26106: "CDFA",
      26395: "CDFB",
      24536: "CDFC",
      22916: "CDFD",
      23041: "CDFE",
      24013: "CEA1",
      24494: "CEA2",
      21361: "CEA3",
      38886: "CEA4",
      36829: "CEA5",
      26693: "CEA6",
      22260: "CEA7",
      21807: "CEA8",
      24799: "CEA9",
      20026: "CEAA",
      28493: "CEAB",
      32500: "CEAC",
      33479: "CEAD",
      33806: "CEAE",
      22996: "CEAF",
      20255: "CEB0",
      20266: "CEB1",
      23614: "CEB2",
      32428: "CEB3",
      26410: "CEB4",
      34074: "CEB5",
      21619: "CEB6",
      30031: "CEB7",
      32963: "CEB8",
      21890: "CEB9",
      39759: "CEBA",
      20301: "CEBB",
      28205: "CEBC",
      35859: "CEBD",
      23561: "CEBE",
      24944: "CEBF",
      21355: "CEC0",
      30239: "CEC1",
      28201: "CEC2",
      34442: "CEC3",
      25991: "CEC4",
      38395: "CEC5",
      32441: "CEC6",
      21563: "CEC7",
      31283: "CEC8",
      32010: "CEC9",
      38382: "CECA",
      21985: "CECB",
      32705: "CECC",
      29934: "CECD",
      25373: "CECE",
      34583: "CECF",
      28065: "CED0",
      31389: "CED1",
      25105: "CED2",
      26017: "CED3",
      21351: "CED4",
      25569: "CED5",
      27779: "CED6",
      24043: "CED7",
      21596: "CED8",
      38056: "CED9",
      20044: "CEDA",
      27745: "CEDB",
      35820: "CEDC",
      23627: "CEDD",
      26080: "CEDE",
      33436: "CEDF",
      26791: "CEE0",
      21566: "CEE1",
      21556: "CEE2",
      27595: "CEE3",
      27494: "CEE4",
      20116: "CEE5",
      25410: "CEE6",
      21320: "CEE7",
      33310: "CEE8",
      20237: "CEE9",
      20398: "CEEA",
      22366: "CEEB",
      25098: "CEEC",
      38654: "CEED",
      26212: "CEEE",
      29289: "CEEF",
      21247: "CEF0",
      21153: "CEF1",
      24735: "CEF2",
      35823: "CEF3",
      26132: "CEF4",
      29081: "CEF5",
      26512: "CEF6",
      35199: "CEF7",
      30802: "CEF8",
      30717: "CEF9",
      26224: "CEFA",
      22075: "CEFB",
      21560: "CEFC",
      38177: "CEFD",
      29306: "CEFE",
      31232: "CFA1",
      24687: "CFA2",
      24076: "CFA3",
      24713: "CFA4",
      33181: "CFA5",
      22805: "CFA6",
      24796: "CFA7",
      29060: "CFA8",
      28911: "CFA9",
      28330: "CFAA",
      27728: "CFAB",
      29312: "CFAC",
      27268: "CFAD",
      34989: "CFAE",
      24109: "CFAF",
      20064: "CFB0",
      23219: "CFB1",
      21916: "CFB2",
      38115: "CFB3",
      27927: "CFB4",
      31995: "CFB5",
      38553: "CFB6",
      25103: "CFB7",
      32454: "CFB8",
      30606: "CFB9",
      34430: "CFBA",
      21283: "CFBB",
      38686: "CFBC",
      36758: "CFBD",
      26247: "CFBE",
      23777: "CFBF",
      20384: "CFC0",
      29421: "CFC1",
      19979: "CFC2",
      21414: "CFC3",
      22799: "CFC4",
      21523: "CFC5",
      25472: "CFC6",
      38184: "CFC7",
      20808: "CFC8",
      20185: "CFC9",
      40092: "CFCA",
      32420: "CFCB",
      21688: "CFCC",
      36132: "CFCD",
      34900: "CFCE",
      33335: "CFCF",
      38386: "CFD0",
      28046: "CFD1",
      24358: "CFD2",
      23244: "CFD3",
      26174: "CFD4",
      38505: "CFD5",
      29616: "CFD6",
      29486: "CFD7",
      21439: "CFD8",
      33146: "CFD9",
      39301: "CFDA",
      32673: "CFDB",
      23466: "CFDC",
      38519: "CFDD",
      38480: "CFDE",
      32447: "CFDF",
      30456: "CFE0",
      21410: "CFE1",
      38262: "CFE2",
      39321: "CFE3",
      31665: "CFE4",
      35140: "CFE5",
      28248: "CFE6",
      20065: "CFE7",
      32724: "CFE8",
      31077: "CFE9",
      35814: "CFEA",
      24819: "CFEB",
      21709: "CFEC",
      20139: "CFED",
      39033: "CFEE",
      24055: "CFEF",
      27233: "CFF0",
      20687: "CFF1",
      21521: "CFF2",
      35937: "CFF3",
      33831: "CFF4",
      30813: "CFF5",
      38660: "CFF6",
      21066: "CFF7",
      21742: "CFF8",
      22179: "CFF9",
      38144: "CFFA",
      28040: "CFFB",
      23477: "CFFC",
      28102: "CFFD",
      26195: "CFFE",
      23567: "D0A1",
      23389: "D0A2",
      26657: "D0A3",
      32918: "D0A4",
      21880: "D0A5",
      31505: "D0A6",
      25928: "D0A7",
      26964: "D0A8",
      20123: "D0A9",
      27463: "D0AA",
      34638: "D0AB",
      38795: "D0AC",
      21327: "D0AD",
      25375: "D0AE",
      25658: "D0AF",
      37034: "D0B0",
      26012: "D0B1",
      32961: "D0B2",
      35856: "D0B3",
      20889: "D0B4",
      26800: "D0B5",
      21368: "D0B6",
      34809: "D0B7",
      25032: "D0B8",
      27844: "D0B9",
      27899: "D0BA",
      35874: "D0BB",
      23633: "D0BC",
      34218: "D0BD",
      33455: "D0BE",
      38156: "D0BF",
      27427: "D0C0",
      36763: "D0C1",
      26032: "D0C2",
      24571: "D0C3",
      24515: "D0C4",
      20449: "D0C5",
      34885: "D0C6",
      26143: "D0C7",
      33125: "D0C8",
      29481: "D0C9",
      24826: "D0CA",
      20852: "D0CB",
      21009: "D0CC",
      22411: "D0CD",
      24418: "D0CE",
      37026: "D0CF",
      34892: "D0D0",
      37266: "D0D1",
      24184: "D0D2",
      26447: "D0D3",
      24615: "D0D4",
      22995: "D0D5",
      20804: "D0D6",
      20982: "D0D7",
      33016: "D0D8",
      21256: "D0D9",
      27769: "D0DA",
      38596: "D0DB",
      29066: "D0DC",
      20241: "D0DD",
      20462: "D0DE",
      32670: "D0DF",
      26429: "D0E0",
      21957: "D0E1",
      38152: "D0E2",
      31168: "D0E3",
      34966: "D0E4",
      32483: "D0E5",
      22687: "D0E6",
      25100: "D0E7",
      38656: "D0E8",
      34394: "D0E9",
      22040: "D0EA",
      39035: "D0EB",
      24464: "D0EC",
      35768: "D0ED",
      33988: "D0EE",
      37207: "D0EF",
      21465: "D0F0",
      26093: "D0F1",
      24207: "D0F2",
      30044: "D0F3",
      24676: "D0F4",
      32110: "D0F5",
      23167: "D0F6",
      32490: "D0F7",
      32493: "D0F8",
      36713: "D0F9",
      21927: "D0FA",
      23459: "D0FB",
      24748: "D0FC",
      26059: "D0FD",
      29572: "D0FE",
      36873: "D1A1",
      30307: "D1A2",
      30505: "D1A3",
      32474: "D1A4",
      38772: "D1A5",
      34203: "D1A6",
      23398: "D1A7",
      31348: "D1A8",
      38634: "D1A9",
      34880: "D1AA",
      21195: "D1AB",
      29071: "D1AC",
      24490: "D1AD",
      26092: "D1AE",
      35810: "D1AF",
      23547: "D1B0",
      39535: "D1B1",
      24033: "D1B2",
      27529: "D1B3",
      27739: "D1B4",
      35757: "D1B5",
      35759: "D1B6",
      36874: "D1B7",
      36805: "D1B8",
      21387: "D1B9",
      25276: "D1BA",
      40486: "D1BB",
      40493: "D1BC",
      21568: "D1BD",
      20011: "D1BE",
      33469: "D1BF",
      29273: "D1C0",
      34460: "D1C1",
      23830: "D1C2",
      34905: "D1C3",
      28079: "D1C4",
      38597: "D1C5",
      21713: "D1C6",
      20122: "D1C7",
      35766: "D1C8",
      28937: "D1C9",
      21693: "D1CA",
      38409: "D1CB",
      28895: "D1CC",
      28153: "D1CD",
      30416: "D1CE",
      20005: "D1CF",
      30740: "D1D0",
      34578: "D1D1",
      23721: "D1D2",
      24310: "D1D3",
      35328: "D1D4",
      39068: "D1D5",
      38414: "D1D6",
      28814: "D1D7",
      27839: "D1D8",
      22852: "D1D9",
      25513: "D1DA",
      30524: "D1DB",
      34893: "D1DC",
      28436: "D1DD",
      33395: "D1DE",
      22576: "D1DF",
      29141: "D1E0",
      21388: "D1E1",
      30746: "D1E2",
      38593: "D1E3",
      21761: "D1E4",
      24422: "D1E5",
      28976: "D1E6",
      23476: "D1E7",
      35866: "D1E8",
      39564: "D1E9",
      27523: "D1EA",
      22830: "D1EB",
      40495: "D1EC",
      31207: "D1ED",
      26472: "D1EE",
      25196: "D1EF",
      20335: "D1F0",
      30113: "D1F1",
      32650: "D1F2",
      27915: "D1F3",
      38451: "D1F4",
      27687: "D1F5",
      20208: "D1F6",
      30162: "D1F7",
      20859: "D1F8",
      26679: "D1F9",
      28478: "D1FA",
      36992: "D1FB",
      33136: "D1FC",
      22934: "D1FD",
      29814: "D1FE",
      25671: "D2A1",
      23591: "D2A2",
      36965: "D2A3",
      31377: "D2A4",
      35875: "D2A5",
      23002: "D2A6",
      21676: "D2A7",
      33280: "D2A8",
      33647: "D2A9",
      35201: "D2AA",
      32768: "D2AB",
      26928: "D2AC",
      22094: "D2AD",
      32822: "D2AE",
      29239: "D2AF",
      37326: "D2B0",
      20918: "D2B1",
      20063: "D2B2",
      39029: "D2B3",
      25494: "D2B4",
      19994: "D2B5",
      21494: "D2B6",
      26355: "D2B7",
      33099: "D2B8",
      22812: "D2B9",
      28082: "D2BA",
      19968: "D2BB",
      22777: "D2BC",
      21307: "D2BD",
      25558: "D2BE",
      38129: "D2BF",
      20381: "D2C0",
      20234: "D2C1",
      34915: "D2C2",
      39056: "D2C3",
      22839: "D2C4",
      36951: "D2C5",
      31227: "D2C6",
      20202: "D2C7",
      33008: "D2C8",
      30097: "D2C9",
      27778: "D2CA",
      23452: "D2CB",
      23016: "D2CC",
      24413: "D2CD",
      26885: "D2CE",
      34433: "D2CF",
      20506: "D2D0",
      24050: "D2D1",
      20057: "D2D2",
      30691: "D2D3",
      20197: "D2D4",
      33402: "D2D5",
      25233: "D2D6",
      26131: "D2D7",
      37009: "D2D8",
      23673: "D2D9",
      20159: "D2DA",
      24441: "D2DB",
      33222: "D2DC",
      36920: "D2DD",
      32900: "D2DE",
      30123: "D2DF",
      20134: "D2E0",
      35028: "D2E1",
      24847: "D2E2",
      27589: "D2E3",
      24518: "D2E4",
      20041: "D2E5",
      30410: "D2E6",
      28322: "D2E7",
      35811: "D2E8",
      35758: "D2E9",
      35850: "D2EA",
      35793: "D2EB",
      24322: "D2EC",
      32764: "D2ED",
      32716: "D2EE",
      32462: "D2EF",
      33589: "D2F0",
      33643: "D2F1",
      22240: "D2F2",
      27575: "D2F3",
      38899: "D2F4",
      38452: "D2F5",
      23035: "D2F6",
      21535: "D2F7",
      38134: "D2F8",
      28139: "D2F9",
      23493: "D2FA",
      39278: "D2FB",
      23609: "D2FC",
      24341: "D2FD",
      38544: "D2FE",
      21360: "D3A1",
      33521: "D3A2",
      27185: "D3A3",
      23156: "D3A4",
      40560: "D3A5",
      24212: "D3A6",
      32552: "D3A7",
      33721: "D3A8",
      33828: "D3A9",
      33829: "D3AA",
      33639: "D3AB",
      34631: "D3AC",
      36814: "D3AD",
      36194: "D3AE",
      30408: "D3AF",
      24433: "D3B0",
      39062: "D3B1",
      30828: "D3B2",
      26144: "D3B3",
      21727: "D3B4",
      25317: "D3B5",
      20323: "D3B6",
      33219: "D3B7",
      30152: "D3B8",
      24248: "D3B9",
      38605: "D3BA",
      36362: "D3BB",
      34553: "D3BC",
      21647: "D3BD",
      27891: "D3BE",
      28044: "D3BF",
      27704: "D3C0",
      24703: "D3C1",
      21191: "D3C2",
      29992: "D3C3",
      24189: "D3C4",
      20248: "D3C5",
      24736: "D3C6",
      24551: "D3C7",
      23588: "D3C8",
      30001: "D3C9",
      37038: "D3CA",
      38080: "D3CB",
      29369: "D3CC",
      27833: "D3CD",
      28216: "D3CE",
      37193: "D3CF",
      26377: "D3D0",
      21451: "D3D1",
      21491: "D3D2",
      20305: "D3D3",
      37321: "D3D4",
      35825: "D3D5",
      21448: "D3D6",
      24188: "D3D7",
      36802: "D3D8",
      28132: "D3D9",
      20110: "D3DA",
      30402: "D3DB",
      27014: "D3DC",
      34398: "D3DD",
      24858: "D3DE",
      33286: "D3DF",
      20313: "D3E0",
      20446: "D3E1",
      36926: "D3E2",
      40060: "D3E3",
      24841: "D3E4",
      28189: "D3E5",
      28180: "D3E6",
      38533: "D3E7",
      20104: "D3E8",
      23089: "D3E9",
      38632: "D3EA",
      19982: "D3EB",
      23679: "D3EC",
      31161: "D3ED",
      23431: "D3EE",
      35821: "D3EF",
      32701: "D3F0",
      29577: "D3F1",
      22495: "D3F2",
      33419: "D3F3",
      37057: "D3F4",
      21505: "D3F5",
      36935: "D3F6",
      21947: "D3F7",
      23786: "D3F8",
      24481: "D3F9",
      24840: "D3FA",
      27442: "D3FB",
      29425: "D3FC",
      32946: "D3FD",
      35465: "D3FE",
      28020: "D4A1",
      23507: "D4A2",
      35029: "D4A3",
      39044: "D4A4",
      35947: "D4A5",
      39533: "D4A6",
      40499: "D4A7",
      28170: "D4A8",
      20900: "D4A9",
      20803: "D4AA",
      22435: "D4AB",
      34945: "D4AC",
      21407: "D4AD",
      25588: "D4AE",
      36757: "D4AF",
      22253: "D4B0",
      21592: "D4B1",
      22278: "D4B2",
      29503: "D4B3",
      28304: "D4B4",
      32536: "D4B5",
      36828: "D4B6",
      33489: "D4B7",
      24895: "D4B8",
      24616: "D4B9",
      38498: "D4BA",
      26352: "D4BB",
      32422: "D4BC",
      36234: "D4BD",
      36291: "D4BE",
      38053: "D4BF",
      23731: "D4C0",
      31908: "D4C1",
      26376: "D4C2",
      24742: "D4C3",
      38405: "D4C4",
      32792: "D4C5",
      20113: "D4C6",
      37095: "D4C7",
      21248: "D4C8",
      38504: "D4C9",
      20801: "D4CA",
      36816: "D4CB",
      34164: "D4CC",
      37213: "D4CD",
      26197: "D4CE",
      38901: "D4CF",
      23381: "D4D0",
      21277: "D4D1",
      30776: "D4D2",
      26434: "D4D3",
      26685: "D4D4",
      21705: "D4D5",
      28798: "D4D6",
      23472: "D4D7",
      36733: "D4D8",
      20877: "D4D9",
      22312: "D4DA",
      21681: "D4DB",
      25874: "D4DC",
      26242: "D4DD",
      36190: "D4DE",
      36163: "D4DF",
      33039: "D4E0",
      33900: "D4E1",
      36973: "D4E2",
      31967: "D4E3",
      20991: "D4E4",
      34299: "D4E5",
      26531: "D4E6",
      26089: "D4E7",
      28577: "D4E8",
      34468: "D4E9",
      36481: "D4EA",
      22122: "D4EB",
      36896: "D4EC",
      30338: "D4ED",
      28790: "D4EE",
      29157: "D4EF",
      36131: "D4F0",
      25321: "D4F1",
      21017: "D4F2",
      27901: "D4F3",
      36156: "D4F4",
      24590: "D4F5",
      22686: "D4F6",
      24974: "D4F7",
      26366: "D4F8",
      36192: "D4F9",
      25166: "D4FA",
      21939: "D4FB",
      28195: "D4FC",
      26413: "D4FD",
      36711: "D4FE",
      38113: "D5A1",
      38392: "D5A2",
      30504: "D5A3",
      26629: "D5A4",
      27048: "D5A5",
      21643: "D5A6",
      20045: "D5A7",
      28856: "D5A8",
      35784: "D5A9",
      25688: "D5AA",
      25995: "D5AB",
      23429: "D5AC",
      31364: "D5AD",
      20538: "D5AE",
      23528: "D5AF",
      30651: "D5B0",
      27617: "D5B1",
      35449: "D5B2",
      31896: "D5B3",
      27838: "D5B4",
      30415: "D5B5",
      26025: "D5B6",
      36759: "D5B7",
      23853: "D5B8",
      23637: "D5B9",
      34360: "D5BA",
      26632: "D5BB",
      21344: "D5BC",
      25112: "D5BD",
      31449: "D5BE",
      28251: "D5BF",
      32509: "D5C0",
      27167: "D5C1",
      31456: "D5C2",
      24432: "D5C3",
      28467: "D5C4",
      24352: "D5C5",
      25484: "D5C6",
      28072: "D5C7",
      26454: "D5C8",
      19976: "D5C9",
      24080: "D5CA",
      36134: "D5CB",
      20183: "D5CC",
      32960: "D5CD",
      30260: "D5CE",
      38556: "D5CF",
      25307: "D5D0",
      26157: "D5D1",
      25214: "D5D2",
      27836: "D5D3",
      36213: "D5D4",
      29031: "D5D5",
      32617: "D5D6",
      20806: "D5D7",
      32903: "D5D8",
      21484: "D5D9",
      36974: "D5DA",
      25240: "D5DB",
      21746: "D5DC",
      34544: "D5DD",
      36761: "D5DE",
      32773: "D5DF",
      38167: "D5E0",
      34071: "D5E1",
      36825: "D5E2",
      27993: "D5E3",
      29645: "D5E4",
      26015: "D5E5",
      30495: "D5E6",
      29956: "D5E7",
      30759: "D5E8",
      33275: "D5E9",
      36126: "D5EA",
      38024: "D5EB",
      20390: "D5EC",
      26517: "D5ED",
      30137: "D5EE",
      35786: "D5EF",
      38663: "D5F0",
      25391: "D5F1",
      38215: "D5F2",
      38453: "D5F3",
      33976: "D5F4",
      25379: "D5F5",
      30529: "D5F6",
      24449: "D5F7",
      29424: "D5F8",
      20105: "D5F9",
      24596: "D5FA",
      25972: "D5FB",
      25327: "D5FC",
      27491: "D5FD",
      25919: "D5FE",
      24103: "D6A1",
      30151: "D6A2",
      37073: "D6A3",
      35777: "D6A4",
      33437: "D6A5",
      26525: "D6A6",
      25903: "D6A7",
      21553: "D6A8",
      34584: "D6A9",
      30693: "D6AA",
      32930: "D6AB",
      33026: "D6AC",
      27713: "D6AD",
      20043: "D6AE",
      32455: "D6AF",
      32844: "D6B0",
      30452: "D6B1",
      26893: "D6B2",
      27542: "D6B3",
      25191: "D6B4",
      20540: "D6B5",
      20356: "D6B6",
      22336: "D6B7",
      25351: "D6B8",
      27490: "D6B9",
      36286: "D6BA",
      21482: "D6BB",
      26088: "D6BC",
      32440: "D6BD",
      24535: "D6BE",
      25370: "D6BF",
      25527: "D6C0",
      33267: "D6C1",
      33268: "D6C2",
      32622: "D6C3",
      24092: "D6C4",
      23769: "D6C5",
      21046: "D6C6",
      26234: "D6C7",
      31209: "D6C8",
      31258: "D6C9",
      36136: "D6CA",
      28825: "D6CB",
      30164: "D6CC",
      28382: "D6CD",
      27835: "D6CE",
      31378: "D6CF",
      20013: "D6D0",
      30405: "D6D1",
      24544: "D6D2",
      38047: "D6D3",
      34935: "D6D4",
      32456: "D6D5",
      31181: "D6D6",
      32959: "D6D7",
      37325: "D6D8",
      20210: "D6D9",
      20247: "D6DA",
      33311: "D6DB",
      21608: "D6DC",
      24030: "D6DD",
      27954: "D6DE",
      35788: "D6DF",
      31909: "D6E0",
      36724: "D6E1",
      32920: "D6E2",
      24090: "D6E3",
      21650: "D6E4",
      30385: "D6E5",
      23449: "D6E6",
      26172: "D6E7",
      39588: "D6E8",
      29664: "D6E9",
      26666: "D6EA",
      34523: "D6EB",
      26417: "D6EC",
      29482: "D6ED",
      35832: "D6EE",
      35803: "D6EF",
      36880: "D6F0",
      31481: "D6F1",
      28891: "D6F2",
      29038: "D6F3",
      25284: "D6F4",
      30633: "D6F5",
      22065: "D6F6",
      20027: "D6F7",
      33879: "D6F8",
      26609: "D6F9",
      21161: "D6FA",
      34496: "D6FB",
      36142: "D6FC",
      38136: "D6FD",
      31569: "D6FE",
      20303: "D7A1",
      27880: "D7A2",
      31069: "D7A3",
      39547: "D7A4",
      25235: "D7A5",
      29226: "D7A6",
      25341: "D7A7",
      19987: "D7A8",
      30742: "D7A9",
      36716: "D7AA",
      25776: "D7AB",
      36186: "D7AC",
      31686: "D7AD",
      26729: "D7AE",
      24196: "D7AF",
      35013: "D7B0",
      22918: "D7B1",
      25758: "D7B2",
      22766: "D7B3",
      29366: "D7B4",
      26894: "D7B5",
      38181: "D7B6",
      36861: "D7B7",
      36184: "D7B8",
      22368: "D7B9",
      32512: "D7BA",
      35846: "D7BB",
      20934: "D7BC",
      25417: "D7BD",
      25305: "D7BE",
      21331: "D7BF",
      26700: "D7C0",
      29730: "D7C1",
      33537: "D7C2",
      37196: "D7C3",
      21828: "D7C4",
      30528: "D7C5",
      28796: "D7C6",
      27978: "D7C7",
      20857: "D7C8",
      21672: "D7C9",
      36164: "D7CA",
      23039: "D7CB",
      28363: "D7CC",
      28100: "D7CD",
      23388: "D7CE",
      32043: "D7CF",
      20180: "D7D0",
      31869: "D7D1",
      28371: "D7D2",
      23376: "D7D3",
      33258: "D7D4",
      28173: "D7D5",
      23383: "D7D6",
      39683: "D7D7",
      26837: "D7D8",
      36394: "D7D9",
      23447: "D7DA",
      32508: "D7DB",
      24635: "D7DC",
      32437: "D7DD",
      37049: "D7DE",
      36208: "D7DF",
      22863: "D7E0",
      25549: "D7E1",
      31199: "D7E2",
      36275: "D7E3",
      21330: "D7E4",
      26063: "D7E5",
      31062: "D7E6",
      35781: "D7E7",
      38459: "D7E8",
      32452: "D7E9",
      38075: "D7EA",
      32386: "D7EB",
      22068: "D7EC",
      37257: "D7ED",
      26368: "D7EE",
      32618: "D7EF",
      23562: "D7F0",
      36981: "D7F1",
      26152: "D7F2",
      24038: "D7F3",
      20304: "D7F4",
      26590: "D7F5",
      20570: "D7F6",
      20316: "D7F7",
      22352: "D7F8",
      24231: "D7F9",
      20109: "D8A1",
      19980: "D8A2",
      20800: "D8A3",
      19984: "D8A4",
      24319: "D8A5",
      21317: "D8A6",
      19989: "D8A7",
      20120: "D8A8",
      19998: "D8A9",
      39730: "D8AA",
      23404: "D8AB",
      22121: "D8AC",
      20008: "D8AD",
      31162: "D8AE",
      20031: "D8AF",
      21269: "D8B0",
      20039: "D8B1",
      22829: "D8B2",
      29243: "D8B3",
      21358: "D8B4",
      27664: "D8B5",
      22239: "D8B6",
      32996: "D8B7",
      39319: "D8B8",
      27603: "D8B9",
      30590: "D8BA",
      40727: "D8BB",
      20022: "D8BC",
      20127: "D8BD",
      40720: "D8BE",
      20060: "D8BF",
      20073: "D8C0",
      20115: "D8C1",
      33416: "D8C2",
      23387: "D8C3",
      21868: "D8C4",
      22031: "D8C5",
      20164: "D8C6",
      21389: "D8C7",
      21405: "D8C8",
      21411: "D8C9",
      21413: "D8CA",
      21422: "D8CB",
      38757: "D8CC",
      36189: "D8CD",
      21274: "D8CE",
      21493: "D8CF",
      21286: "D8D0",
      21294: "D8D1",
      21310: "D8D2",
      36188: "D8D3",
      21350: "D8D4",
      21347: "D8D5",
      20994: "D8D6",
      21e3: "D8D7",
      21006: "D8D8",
      21037: "D8D9",
      21043: "D8DA",
      21055: "D8DB",
      21056: "D8DC",
      21068: "D8DD",
      21086: "D8DE",
      21089: "D8DF",
      21084: "D8E0",
      33967: "D8E1",
      21117: "D8E2",
      21122: "D8E3",
      21121: "D8E4",
      21136: "D8E5",
      21139: "D8E6",
      20866: "D8E7",
      32596: "D8E8",
      20155: "D8E9",
      20163: "D8EA",
      20169: "D8EB",
      20162: "D8EC",
      20200: "D8ED",
      20193: "D8EE",
      20203: "D8EF",
      20190: "D8F0",
      20251: "D8F1",
      20211: "D8F2",
      20258: "D8F3",
      20324: "D8F4",
      20213: "D8F5",
      20261: "D8F6",
      20263: "D8F7",
      20233: "D8F8",
      20267: "D8F9",
      20318: "D8FA",
      20327: "D8FB",
      25912: "D8FC",
      20314: "D8FD",
      20317: "D8FE",
      20319: "D9A1",
      20311: "D9A2",
      20274: "D9A3",
      20285: "D9A4",
      20342: "D9A5",
      20340: "D9A6",
      20369: "D9A7",
      20361: "D9A8",
      20355: "D9A9",
      20367: "D9AA",
      20350: "D9AB",
      20347: "D9AC",
      20394: "D9AD",
      20348: "D9AE",
      20396: "D9AF",
      20372: "D9B0",
      20454: "D9B1",
      20456: "D9B2",
      20458: "D9B3",
      20421: "D9B4",
      20442: "D9B5",
      20451: "D9B6",
      20444: "D9B7",
      20433: "D9B8",
      20447: "D9B9",
      20472: "D9BA",
      20521: "D9BB",
      20556: "D9BC",
      20467: "D9BD",
      20524: "D9BE",
      20495: "D9BF",
      20526: "D9C0",
      20525: "D9C1",
      20478: "D9C2",
      20508: "D9C3",
      20492: "D9C4",
      20517: "D9C5",
      20520: "D9C6",
      20606: "D9C7",
      20547: "D9C8",
      20565: "D9C9",
      20552: "D9CA",
      20558: "D9CB",
      20588: "D9CC",
      20603: "D9CD",
      20645: "D9CE",
      20647: "D9CF",
      20649: "D9D0",
      20666: "D9D1",
      20694: "D9D2",
      20742: "D9D3",
      20717: "D9D4",
      20716: "D9D5",
      20710: "D9D6",
      20718: "D9D7",
      20743: "D9D8",
      20747: "D9D9",
      20189: "D9DA",
      27709: "D9DB",
      20312: "D9DC",
      20325: "D9DD",
      20430: "D9DE",
      40864: "D9DF",
      27718: "D9E0",
      31860: "D9E1",
      20846: "D9E2",
      24061: "D9E3",
      40649: "D9E4",
      39320: "D9E5",
      20865: "D9E6",
      22804: "D9E7",
      21241: "D9E8",
      21261: "D9E9",
      35335: "D9EA",
      21264: "D9EB",
      20971: "D9EC",
      22809: "D9ED",
      20821: "D9EE",
      20128: "D9EF",
      20822: "D9F0",
      20147: "D9F1",
      34926: "D9F2",
      34980: "D9F3",
      20149: "D9F4",
      33044: "D9F5",
      35026: "D9F6",
      31104: "D9F7",
      23348: "D9F8",
      34819: "D9F9",
      32696: "D9FA",
      20907: "D9FB",
      20913: "D9FC",
      20925: "D9FD",
      20924: "D9FE",
      20935: "DAA1",
      20886: "DAA2",
      20898: "DAA3",
      20901: "DAA4",
      35744: "DAA5",
      35750: "DAA6",
      35751: "DAA7",
      35754: "DAA8",
      35764: "DAA9",
      35765: "DAAA",
      35767: "DAAB",
      35778: "DAAC",
      35779: "DAAD",
      35787: "DAAE",
      35791: "DAAF",
      35790: "DAB0",
      35794: "DAB1",
      35795: "DAB2",
      35796: "DAB3",
      35798: "DAB4",
      35800: "DAB5",
      35801: "DAB6",
      35804: "DAB7",
      35807: "DAB8",
      35808: "DAB9",
      35812: "DABA",
      35816: "DABB",
      35817: "DABC",
      35822: "DABD",
      35824: "DABE",
      35827: "DABF",
      35830: "DAC0",
      35833: "DAC1",
      35836: "DAC2",
      35839: "DAC3",
      35840: "DAC4",
      35842: "DAC5",
      35844: "DAC6",
      35847: "DAC7",
      35852: "DAC8",
      35855: "DAC9",
      35857: "DACA",
      35858: "DACB",
      35860: "DACC",
      35861: "DACD",
      35862: "DACE",
      35865: "DACF",
      35867: "DAD0",
      35864: "DAD1",
      35869: "DAD2",
      35871: "DAD3",
      35872: "DAD4",
      35873: "DAD5",
      35877: "DAD6",
      35879: "DAD7",
      35882: "DAD8",
      35883: "DAD9",
      35886: "DADA",
      35887: "DADB",
      35890: "DADC",
      35891: "DADD",
      35893: "DADE",
      35894: "DADF",
      21353: "DAE0",
      21370: "DAE1",
      38429: "DAE2",
      38434: "DAE3",
      38433: "DAE4",
      38449: "DAE5",
      38442: "DAE6",
      38461: "DAE7",
      38460: "DAE8",
      38466: "DAE9",
      38473: "DAEA",
      38484: "DAEB",
      38495: "DAEC",
      38503: "DAED",
      38508: "DAEE",
      38514: "DAEF",
      38516: "DAF0",
      38536: "DAF1",
      38541: "DAF2",
      38551: "DAF3",
      38576: "DAF4",
      37015: "DAF5",
      37019: "DAF6",
      37021: "DAF7",
      37017: "DAF8",
      37036: "DAF9",
      37025: "DAFA",
      37044: "DAFB",
      37043: "DAFC",
      37046: "DAFD",
      37050: "DAFE",
      37048: "DBA1",
      37040: "DBA2",
      37071: "DBA3",
      37061: "DBA4",
      37054: "DBA5",
      37072: "DBA6",
      37060: "DBA7",
      37063: "DBA8",
      37075: "DBA9",
      37094: "DBAA",
      37090: "DBAB",
      37084: "DBAC",
      37079: "DBAD",
      37083: "DBAE",
      37099: "DBAF",
      37103: "DBB0",
      37118: "DBB1",
      37124: "DBB2",
      37154: "DBB3",
      37150: "DBB4",
      37155: "DBB5",
      37169: "DBB6",
      37167: "DBB7",
      37177: "DBB8",
      37187: "DBB9",
      37190: "DBBA",
      21005: "DBBB",
      22850: "DBBC",
      21154: "DBBD",
      21164: "DBBE",
      21165: "DBBF",
      21182: "DBC0",
      21759: "DBC1",
      21200: "DBC2",
      21206: "DBC3",
      21232: "DBC4",
      21471: "DBC5",
      29166: "DBC6",
      30669: "DBC7",
      24308: "DBC8",
      20981: "DBC9",
      20988: "DBCA",
      39727: "DBCB",
      21430: "DBCC",
      24321: "DBCD",
      30042: "DBCE",
      24047: "DBCF",
      22348: "DBD0",
      22441: "DBD1",
      22433: "DBD2",
      22654: "DBD3",
      22716: "DBD4",
      22725: "DBD5",
      22737: "DBD6",
      22313: "DBD7",
      22316: "DBD8",
      22314: "DBD9",
      22323: "DBDA",
      22329: "DBDB",
      22318: "DBDC",
      22319: "DBDD",
      22364: "DBDE",
      22331: "DBDF",
      22338: "DBE0",
      22377: "DBE1",
      22405: "DBE2",
      22379: "DBE3",
      22406: "DBE4",
      22396: "DBE5",
      22395: "DBE6",
      22376: "DBE7",
      22381: "DBE8",
      22390: "DBE9",
      22387: "DBEA",
      22445: "DBEB",
      22436: "DBEC",
      22412: "DBED",
      22450: "DBEE",
      22479: "DBEF",
      22439: "DBF0",
      22452: "DBF1",
      22419: "DBF2",
      22432: "DBF3",
      22485: "DBF4",
      22488: "DBF5",
      22490: "DBF6",
      22489: "DBF7",
      22482: "DBF8",
      22456: "DBF9",
      22516: "DBFA",
      22511: "DBFB",
      22520: "DBFC",
      22500: "DBFD",
      22493: "DBFE",
      22539: "DCA1",
      22541: "DCA2",
      22525: "DCA3",
      22509: "DCA4",
      22528: "DCA5",
      22558: "DCA6",
      22553: "DCA7",
      22596: "DCA8",
      22560: "DCA9",
      22629: "DCAA",
      22636: "DCAB",
      22657: "DCAC",
      22665: "DCAD",
      22682: "DCAE",
      22656: "DCAF",
      39336: "DCB0",
      40729: "DCB1",
      25087: "DCB2",
      33401: "DCB3",
      33405: "DCB4",
      33407: "DCB5",
      33423: "DCB6",
      33418: "DCB7",
      33448: "DCB8",
      33412: "DCB9",
      33422: "DCBA",
      33425: "DCBB",
      33431: "DCBC",
      33433: "DCBD",
      33451: "DCBE",
      33464: "DCBF",
      33470: "DCC0",
      33456: "DCC1",
      33480: "DCC2",
      33482: "DCC3",
      33507: "DCC4",
      33432: "DCC5",
      33463: "DCC6",
      33454: "DCC7",
      33483: "DCC8",
      33484: "DCC9",
      33473: "DCCA",
      33449: "DCCB",
      33460: "DCCC",
      33441: "DCCD",
      33450: "DCCE",
      33439: "DCCF",
      33476: "DCD0",
      33486: "DCD1",
      33444: "DCD2",
      33505: "DCD3",
      33545: "DCD4",
      33527: "DCD5",
      33508: "DCD6",
      33551: "DCD7",
      33543: "DCD8",
      33500: "DCD9",
      33524: "DCDA",
      33490: "DCDB",
      33496: "DCDC",
      33548: "DCDD",
      33531: "DCDE",
      33491: "DCDF",
      33553: "DCE0",
      33562: "DCE1",
      33542: "DCE2",
      33556: "DCE3",
      33557: "DCE4",
      33504: "DCE5",
      33493: "DCE6",
      33564: "DCE7",
      33617: "DCE8",
      33627: "DCE9",
      33628: "DCEA",
      33544: "DCEB",
      33682: "DCEC",
      33596: "DCED",
      33588: "DCEE",
      33585: "DCEF",
      33691: "DCF0",
      33630: "DCF1",
      33583: "DCF2",
      33615: "DCF3",
      33607: "DCF4",
      33603: "DCF5",
      33631: "DCF6",
      33600: "DCF7",
      33559: "DCF8",
      33632: "DCF9",
      33581: "DCFA",
      33594: "DCFB",
      33587: "DCFC",
      33638: "DCFD",
      33637: "DCFE",
      33640: "DDA1",
      33563: "DDA2",
      33641: "DDA3",
      33644: "DDA4",
      33642: "DDA5",
      33645: "DDA6",
      33646: "DDA7",
      33712: "DDA8",
      33656: "DDA9",
      33715: "DDAA",
      33716: "DDAB",
      33696: "DDAC",
      33706: "DDAD",
      33683: "DDAE",
      33692: "DDAF",
      33669: "DDB0",
      33660: "DDB1",
      33718: "DDB2",
      33705: "DDB3",
      33661: "DDB4",
      33720: "DDB5",
      33659: "DDB6",
      33688: "DDB7",
      33694: "DDB8",
      33704: "DDB9",
      33722: "DDBA",
      33724: "DDBB",
      33729: "DDBC",
      33793: "DDBD",
      33765: "DDBE",
      33752: "DDBF",
      22535: "DDC0",
      33816: "DDC1",
      33803: "DDC2",
      33757: "DDC3",
      33789: "DDC4",
      33750: "DDC5",
      33820: "DDC6",
      33848: "DDC7",
      33809: "DDC8",
      33798: "DDC9",
      33748: "DDCA",
      33759: "DDCB",
      33807: "DDCC",
      33795: "DDCD",
      33784: "DDCE",
      33785: "DDCF",
      33770: "DDD0",
      33733: "DDD1",
      33728: "DDD2",
      33830: "DDD3",
      33776: "DDD4",
      33761: "DDD5",
      33884: "DDD6",
      33873: "DDD7",
      33882: "DDD8",
      33881: "DDD9",
      33907: "DDDA",
      33927: "DDDB",
      33928: "DDDC",
      33914: "DDDD",
      33929: "DDDE",
      33912: "DDDF",
      33852: "DDE0",
      33862: "DDE1",
      33897: "DDE2",
      33910: "DDE3",
      33932: "DDE4",
      33934: "DDE5",
      33841: "DDE6",
      33901: "DDE7",
      33985: "DDE8",
      33997: "DDE9",
      34e3: "DDEA",
      34022: "DDEB",
      33981: "DDEC",
      34003: "DDED",
      33994: "DDEE",
      33983: "DDEF",
      33978: "DDF0",
      34016: "DDF1",
      33953: "DDF2",
      33977: "DDF3",
      33972: "DDF4",
      33943: "DDF5",
      34021: "DDF6",
      34019: "DDF7",
      34060: "DDF8",
      29965: "DDF9",
      34104: "DDFA",
      34032: "DDFB",
      34105: "DDFC",
      34079: "DDFD",
      34106: "DDFE",
      34134: "DEA1",
      34107: "DEA2",
      34047: "DEA3",
      34044: "DEA4",
      34137: "DEA5",
      34120: "DEA6",
      34152: "DEA7",
      34148: "DEA8",
      34142: "DEA9",
      34170: "DEAA",
      30626: "DEAB",
      34115: "DEAC",
      34162: "DEAD",
      34171: "DEAE",
      34212: "DEAF",
      34216: "DEB0",
      34183: "DEB1",
      34191: "DEB2",
      34169: "DEB3",
      34222: "DEB4",
      34204: "DEB5",
      34181: "DEB6",
      34233: "DEB7",
      34231: "DEB8",
      34224: "DEB9",
      34259: "DEBA",
      34241: "DEBB",
      34268: "DEBC",
      34303: "DEBD",
      34343: "DEBE",
      34309: "DEBF",
      34345: "DEC0",
      34326: "DEC1",
      34364: "DEC2",
      24318: "DEC3",
      24328: "DEC4",
      22844: "DEC5",
      22849: "DEC6",
      32823: "DEC7",
      22869: "DEC8",
      22874: "DEC9",
      22872: "DECA",
      21263: "DECB",
      23586: "DECC",
      23589: "DECD",
      23596: "DECE",
      23604: "DECF",
      25164: "DED0",
      25194: "DED1",
      25247: "DED2",
      25275: "DED3",
      25290: "DED4",
      25306: "DED5",
      25303: "DED6",
      25326: "DED7",
      25378: "DED8",
      25334: "DED9",
      25401: "DEDA",
      25419: "DEDB",
      25411: "DEDC",
      25517: "DEDD",
      25590: "DEDE",
      25457: "DEDF",
      25466: "DEE0",
      25486: "DEE1",
      25524: "DEE2",
      25453: "DEE3",
      25516: "DEE4",
      25482: "DEE5",
      25449: "DEE6",
      25518: "DEE7",
      25532: "DEE8",
      25586: "DEE9",
      25592: "DEEA",
      25568: "DEEB",
      25599: "DEEC",
      25540: "DEED",
      25566: "DEEE",
      25550: "DEEF",
      25682: "DEF0",
      25542: "DEF1",
      25534: "DEF2",
      25669: "DEF3",
      25665: "DEF4",
      25611: "DEF5",
      25627: "DEF6",
      25632: "DEF7",
      25612: "DEF8",
      25638: "DEF9",
      25633: "DEFA",
      25694: "DEFB",
      25732: "DEFC",
      25709: "DEFD",
      25750: "DEFE",
      25722: "DFA1",
      25783: "DFA2",
      25784: "DFA3",
      25753: "DFA4",
      25786: "DFA5",
      25792: "DFA6",
      25808: "DFA7",
      25815: "DFA8",
      25828: "DFA9",
      25826: "DFAA",
      25865: "DFAB",
      25893: "DFAC",
      25902: "DFAD",
      24331: "DFAE",
      24530: "DFAF",
      29977: "DFB0",
      24337: "DFB1",
      21343: "DFB2",
      21489: "DFB3",
      21501: "DFB4",
      21481: "DFB5",
      21480: "DFB6",
      21499: "DFB7",
      21522: "DFB8",
      21526: "DFB9",
      21510: "DFBA",
      21579: "DFBB",
      21586: "DFBC",
      21587: "DFBD",
      21588: "DFBE",
      21590: "DFBF",
      21571: "DFC0",
      21537: "DFC1",
      21591: "DFC2",
      21593: "DFC3",
      21539: "DFC4",
      21554: "DFC5",
      21634: "DFC6",
      21652: "DFC7",
      21623: "DFC8",
      21617: "DFC9",
      21604: "DFCA",
      21658: "DFCB",
      21659: "DFCC",
      21636: "DFCD",
      21622: "DFCE",
      21606: "DFCF",
      21661: "DFD0",
      21712: "DFD1",
      21677: "DFD2",
      21698: "DFD3",
      21684: "DFD4",
      21714: "DFD5",
      21671: "DFD6",
      21670: "DFD7",
      21715: "DFD8",
      21716: "DFD9",
      21618: "DFDA",
      21667: "DFDB",
      21717: "DFDC",
      21691: "DFDD",
      21695: "DFDE",
      21708: "DFDF",
      21721: "DFE0",
      21722: "DFE1",
      21724: "DFE2",
      21673: "DFE3",
      21674: "DFE4",
      21668: "DFE5",
      21725: "DFE6",
      21711: "DFE7",
      21726: "DFE8",
      21787: "DFE9",
      21735: "DFEA",
      21792: "DFEB",
      21757: "DFEC",
      21780: "DFED",
      21747: "DFEE",
      21794: "DFEF",
      21795: "DFF0",
      21775: "DFF1",
      21777: "DFF2",
      21799: "DFF3",
      21802: "DFF4",
      21863: "DFF5",
      21903: "DFF6",
      21941: "DFF7",
      21833: "DFF8",
      21869: "DFF9",
      21825: "DFFA",
      21845: "DFFB",
      21823: "DFFC",
      21840: "DFFD",
      21820: "DFFE",
      21815: "E0A1",
      21846: "E0A2",
      21877: "E0A3",
      21878: "E0A4",
      21879: "E0A5",
      21811: "E0A6",
      21808: "E0A7",
      21852: "E0A8",
      21899: "E0A9",
      21970: "E0AA",
      21891: "E0AB",
      21937: "E0AC",
      21945: "E0AD",
      21896: "E0AE",
      21889: "E0AF",
      21919: "E0B0",
      21886: "E0B1",
      21974: "E0B2",
      21905: "E0B3",
      21883: "E0B4",
      21983: "E0B5",
      21949: "E0B6",
      21950: "E0B7",
      21908: "E0B8",
      21913: "E0B9",
      21994: "E0BA",
      22007: "E0BB",
      21961: "E0BC",
      22047: "E0BD",
      21969: "E0BE",
      21995: "E0BF",
      21996: "E0C0",
      21972: "E0C1",
      21990: "E0C2",
      21981: "E0C3",
      21956: "E0C4",
      21999: "E0C5",
      21989: "E0C6",
      22002: "E0C7",
      22003: "E0C8",
      21964: "E0C9",
      21965: "E0CA",
      21992: "E0CB",
      22005: "E0CC",
      21988: "E0CD",
      36756: "E0CE",
      22046: "E0CF",
      22024: "E0D0",
      22028: "E0D1",
      22017: "E0D2",
      22052: "E0D3",
      22051: "E0D4",
      22014: "E0D5",
      22016: "E0D6",
      22055: "E0D7",
      22061: "E0D8",
      22104: "E0D9",
      22073: "E0DA",
      22103: "E0DB",
      22060: "E0DC",
      22093: "E0DD",
      22114: "E0DE",
      22105: "E0DF",
      22108: "E0E0",
      22092: "E0E1",
      22100: "E0E2",
      22150: "E0E3",
      22116: "E0E4",
      22129: "E0E5",
      22123: "E0E6",
      22139: "E0E7",
      22140: "E0E8",
      22149: "E0E9",
      22163: "E0EA",
      22191: "E0EB",
      22228: "E0EC",
      22231: "E0ED",
      22237: "E0EE",
      22241: "E0EF",
      22261: "E0F0",
      22251: "E0F1",
      22265: "E0F2",
      22271: "E0F3",
      22276: "E0F4",
      22282: "E0F5",
      22281: "E0F6",
      22300: "E0F7",
      24079: "E0F8",
      24089: "E0F9",
      24084: "E0FA",
      24081: "E0FB",
      24113: "E0FC",
      24123: "E0FD",
      24124: "E0FE",
      24119: "E1A1",
      24132: "E1A2",
      24148: "E1A3",
      24155: "E1A4",
      24158: "E1A5",
      24161: "E1A6",
      23692: "E1A7",
      23674: "E1A8",
      23693: "E1A9",
      23696: "E1AA",
      23702: "E1AB",
      23688: "E1AC",
      23704: "E1AD",
      23705: "E1AE",
      23697: "E1AF",
      23706: "E1B0",
      23708: "E1B1",
      23733: "E1B2",
      23714: "E1B3",
      23741: "E1B4",
      23724: "E1B5",
      23723: "E1B6",
      23729: "E1B7",
      23715: "E1B8",
      23745: "E1B9",
      23735: "E1BA",
      23748: "E1BB",
      23762: "E1BC",
      23780: "E1BD",
      23755: "E1BE",
      23781: "E1BF",
      23810: "E1C0",
      23811: "E1C1",
      23847: "E1C2",
      23846: "E1C3",
      23854: "E1C4",
      23844: "E1C5",
      23838: "E1C6",
      23814: "E1C7",
      23835: "E1C8",
      23896: "E1C9",
      23870: "E1CA",
      23860: "E1CB",
      23869: "E1CC",
      23916: "E1CD",
      23899: "E1CE",
      23919: "E1CF",
      23901: "E1D0",
      23915: "E1D1",
      23883: "E1D2",
      23882: "E1D3",
      23913: "E1D4",
      23924: "E1D5",
      23938: "E1D6",
      23961: "E1D7",
      23965: "E1D8",
      35955: "E1D9",
      23991: "E1DA",
      24005: "E1DB",
      24435: "E1DC",
      24439: "E1DD",
      24450: "E1DE",
      24455: "E1DF",
      24457: "E1E0",
      24460: "E1E1",
      24469: "E1E2",
      24473: "E1E3",
      24476: "E1E4",
      24488: "E1E5",
      24493: "E1E6",
      24501: "E1E7",
      24508: "E1E8",
      34914: "E1E9",
      24417: "E1EA",
      29357: "E1EB",
      29360: "E1EC",
      29364: "E1ED",
      29367: "E1EE",
      29368: "E1EF",
      29379: "E1F0",
      29377: "E1F1",
      29390: "E1F2",
      29389: "E1F3",
      29394: "E1F4",
      29416: "E1F5",
      29423: "E1F6",
      29417: "E1F7",
      29426: "E1F8",
      29428: "E1F9",
      29431: "E1FA",
      29441: "E1FB",
      29427: "E1FC",
      29443: "E1FD",
      29434: "E1FE",
      29435: "E2A1",
      29463: "E2A2",
      29459: "E2A3",
      29473: "E2A4",
      29450: "E2A5",
      29470: "E2A6",
      29469: "E2A7",
      29461: "E2A8",
      29474: "E2A9",
      29497: "E2AA",
      29477: "E2AB",
      29484: "E2AC",
      29496: "E2AD",
      29489: "E2AE",
      29520: "E2AF",
      29517: "E2B0",
      29527: "E2B1",
      29536: "E2B2",
      29548: "E2B3",
      29551: "E2B4",
      29566: "E2B5",
      33307: "E2B6",
      22821: "E2B7",
      39143: "E2B8",
      22820: "E2B9",
      22786: "E2BA",
      39267: "E2BB",
      39271: "E2BC",
      39272: "E2BD",
      39273: "E2BE",
      39274: "E2BF",
      39275: "E2C0",
      39276: "E2C1",
      39284: "E2C2",
      39287: "E2C3",
      39293: "E2C4",
      39296: "E2C5",
      39300: "E2C6",
      39303: "E2C7",
      39306: "E2C8",
      39309: "E2C9",
      39312: "E2CA",
      39313: "E2CB",
      39315: "E2CC",
      39316: "E2CD",
      39317: "E2CE",
      24192: "E2CF",
      24209: "E2D0",
      24203: "E2D1",
      24214: "E2D2",
      24229: "E2D3",
      24224: "E2D4",
      24249: "E2D5",
      24245: "E2D6",
      24254: "E2D7",
      24243: "E2D8",
      36179: "E2D9",
      24274: "E2DA",
      24273: "E2DB",
      24283: "E2DC",
      24296: "E2DD",
      24298: "E2DE",
      33210: "E2DF",
      24516: "E2E0",
      24521: "E2E1",
      24534: "E2E2",
      24527: "E2E3",
      24579: "E2E4",
      24558: "E2E5",
      24580: "E2E6",
      24545: "E2E7",
      24548: "E2E8",
      24574: "E2E9",
      24581: "E2EA",
      24582: "E2EB",
      24554: "E2EC",
      24557: "E2ED",
      24568: "E2EE",
      24601: "E2EF",
      24629: "E2F0",
      24614: "E2F1",
      24603: "E2F2",
      24591: "E2F3",
      24589: "E2F4",
      24617: "E2F5",
      24619: "E2F6",
      24586: "E2F7",
      24639: "E2F8",
      24609: "E2F9",
      24696: "E2FA",
      24697: "E2FB",
      24699: "E2FC",
      24698: "E2FD",
      24642: "E2FE",
      24682: "E3A1",
      24701: "E3A2",
      24726: "E3A3",
      24730: "E3A4",
      24749: "E3A5",
      24733: "E3A6",
      24707: "E3A7",
      24722: "E3A8",
      24716: "E3A9",
      24731: "E3AA",
      24812: "E3AB",
      24763: "E3AC",
      24753: "E3AD",
      24797: "E3AE",
      24792: "E3AF",
      24774: "E3B0",
      24794: "E3B1",
      24756: "E3B2",
      24864: "E3B3",
      24870: "E3B4",
      24853: "E3B5",
      24867: "E3B6",
      24820: "E3B7",
      24832: "E3B8",
      24846: "E3B9",
      24875: "E3BA",
      24906: "E3BB",
      24949: "E3BC",
      25004: "E3BD",
      24980: "E3BE",
      24999: "E3BF",
      25015: "E3C0",
      25044: "E3C1",
      25077: "E3C2",
      24541: "E3C3",
      38579: "E3C4",
      38377: "E3C5",
      38379: "E3C6",
      38385: "E3C7",
      38387: "E3C8",
      38389: "E3C9",
      38390: "E3CA",
      38396: "E3CB",
      38398: "E3CC",
      38403: "E3CD",
      38404: "E3CE",
      38406: "E3CF",
      38408: "E3D0",
      38410: "E3D1",
      38411: "E3D2",
      38412: "E3D3",
      38413: "E3D4",
      38415: "E3D5",
      38418: "E3D6",
      38421: "E3D7",
      38422: "E3D8",
      38423: "E3D9",
      38425: "E3DA",
      38426: "E3DB",
      20012: "E3DC",
      29247: "E3DD",
      25109: "E3DE",
      27701: "E3DF",
      27732: "E3E0",
      27740: "E3E1",
      27722: "E3E2",
      27811: "E3E3",
      27781: "E3E4",
      27792: "E3E5",
      27796: "E3E6",
      27788: "E3E7",
      27752: "E3E8",
      27753: "E3E9",
      27764: "E3EA",
      27766: "E3EB",
      27782: "E3EC",
      27817: "E3ED",
      27856: "E3EE",
      27860: "E3EF",
      27821: "E3F0",
      27895: "E3F1",
      27896: "E3F2",
      27889: "E3F3",
      27863: "E3F4",
      27826: "E3F5",
      27872: "E3F6",
      27862: "E3F7",
      27898: "E3F8",
      27883: "E3F9",
      27886: "E3FA",
      27825: "E3FB",
      27859: "E3FC",
      27887: "E3FD",
      27902: "E3FE",
      27961: "E4A1",
      27943: "E4A2",
      27916: "E4A3",
      27971: "E4A4",
      27976: "E4A5",
      27911: "E4A6",
      27908: "E4A7",
      27929: "E4A8",
      27918: "E4A9",
      27947: "E4AA",
      27981: "E4AB",
      27950: "E4AC",
      27957: "E4AD",
      27930: "E4AE",
      27983: "E4AF",
      27986: "E4B0",
      27988: "E4B1",
      27955: "E4B2",
      28049: "E4B3",
      28015: "E4B4",
      28062: "E4B5",
      28064: "E4B6",
      27998: "E4B7",
      28051: "E4B8",
      28052: "E4B9",
      27996: "E4BA",
      28e3: "E4BB",
      28028: "E4BC",
      28003: "E4BD",
      28186: "E4BE",
      28103: "E4BF",
      28101: "E4C0",
      28126: "E4C1",
      28174: "E4C2",
      28095: "E4C3",
      28128: "E4C4",
      28177: "E4C5",
      28134: "E4C6",
      28125: "E4C7",
      28121: "E4C8",
      28182: "E4C9",
      28075: "E4CA",
      28172: "E4CB",
      28078: "E4CC",
      28203: "E4CD",
      28270: "E4CE",
      28238: "E4CF",
      28267: "E4D0",
      28338: "E4D1",
      28255: "E4D2",
      28294: "E4D3",
      28243: "E4D4",
      28244: "E4D5",
      28210: "E4D6",
      28197: "E4D7",
      28228: "E4D8",
      28383: "E4D9",
      28337: "E4DA",
      28312: "E4DB",
      28384: "E4DC",
      28461: "E4DD",
      28386: "E4DE",
      28325: "E4DF",
      28327: "E4E0",
      28349: "E4E1",
      28347: "E4E2",
      28343: "E4E3",
      28375: "E4E4",
      28340: "E4E5",
      28367: "E4E6",
      28303: "E4E7",
      28354: "E4E8",
      28319: "E4E9",
      28514: "E4EA",
      28486: "E4EB",
      28487: "E4EC",
      28452: "E4ED",
      28437: "E4EE",
      28409: "E4EF",
      28463: "E4F0",
      28470: "E4F1",
      28491: "E4F2",
      28532: "E4F3",
      28458: "E4F4",
      28425: "E4F5",
      28457: "E4F6",
      28553: "E4F7",
      28557: "E4F8",
      28556: "E4F9",
      28536: "E4FA",
      28530: "E4FB",
      28540: "E4FC",
      28538: "E4FD",
      28625: "E4FE",
      28617: "E5A1",
      28583: "E5A2",
      28601: "E5A3",
      28598: "E5A4",
      28610: "E5A5",
      28641: "E5A6",
      28654: "E5A7",
      28638: "E5A8",
      28640: "E5A9",
      28655: "E5AA",
      28698: "E5AB",
      28707: "E5AC",
      28699: "E5AD",
      28729: "E5AE",
      28725: "E5AF",
      28751: "E5B0",
      28766: "E5B1",
      23424: "E5B2",
      23428: "E5B3",
      23445: "E5B4",
      23443: "E5B5",
      23461: "E5B6",
      23480: "E5B7",
      29999: "E5B8",
      39582: "E5B9",
      25652: "E5BA",
      23524: "E5BB",
      23534: "E5BC",
      35120: "E5BD",
      23536: "E5BE",
      36423: "E5BF",
      35591: "E5C0",
      36790: "E5C1",
      36819: "E5C2",
      36821: "E5C3",
      36837: "E5C4",
      36846: "E5C5",
      36836: "E5C6",
      36841: "E5C7",
      36838: "E5C8",
      36851: "E5C9",
      36840: "E5CA",
      36869: "E5CB",
      36868: "E5CC",
      36875: "E5CD",
      36902: "E5CE",
      36881: "E5CF",
      36877: "E5D0",
      36886: "E5D1",
      36897: "E5D2",
      36917: "E5D3",
      36918: "E5D4",
      36909: "E5D5",
      36911: "E5D6",
      36932: "E5D7",
      36945: "E5D8",
      36946: "E5D9",
      36944: "E5DA",
      36968: "E5DB",
      36952: "E5DC",
      36962: "E5DD",
      36955: "E5DE",
      26297: "E5DF",
      36980: "E5E0",
      36989: "E5E1",
      36994: "E5E2",
      37e3: "E5E3",
      36995: "E5E4",
      37003: "E5E5",
      24400: "E5E6",
      24407: "E5E7",
      24406: "E5E8",
      24408: "E5E9",
      23611: "E5EA",
      21675: "E5EB",
      23632: "E5EC",
      23641: "E5ED",
      23409: "E5EE",
      23651: "E5EF",
      23654: "E5F0",
      32700: "E5F1",
      24362: "E5F2",
      24361: "E5F3",
      24365: "E5F4",
      33396: "E5F5",
      24380: "E5F6",
      39739: "E5F7",
      23662: "E5F8",
      22913: "E5F9",
      22915: "E5FA",
      22925: "E5FB",
      22953: "E5FC",
      22954: "E5FD",
      22947: "E5FE",
      22935: "E6A1",
      22986: "E6A2",
      22955: "E6A3",
      22942: "E6A4",
      22948: "E6A5",
      22994: "E6A6",
      22962: "E6A7",
      22959: "E6A8",
      22999: "E6A9",
      22974: "E6AA",
      23045: "E6AB",
      23046: "E6AC",
      23005: "E6AD",
      23048: "E6AE",
      23011: "E6AF",
      23e3: "E6B0",
      23033: "E6B1",
      23052: "E6B2",
      23049: "E6B3",
      23090: "E6B4",
      23092: "E6B5",
      23057: "E6B6",
      23075: "E6B7",
      23059: "E6B8",
      23104: "E6B9",
      23143: "E6BA",
      23114: "E6BB",
      23125: "E6BC",
      23100: "E6BD",
      23138: "E6BE",
      23157: "E6BF",
      33004: "E6C0",
      23210: "E6C1",
      23195: "E6C2",
      23159: "E6C3",
      23162: "E6C4",
      23230: "E6C5",
      23275: "E6C6",
      23218: "E6C7",
      23250: "E6C8",
      23252: "E6C9",
      23224: "E6CA",
      23264: "E6CB",
      23267: "E6CC",
      23281: "E6CD",
      23254: "E6CE",
      23270: "E6CF",
      23256: "E6D0",
      23260: "E6D1",
      23305: "E6D2",
      23319: "E6D3",
      23318: "E6D4",
      23346: "E6D5",
      23351: "E6D6",
      23360: "E6D7",
      23573: "E6D8",
      23580: "E6D9",
      23386: "E6DA",
      23397: "E6DB",
      23411: "E6DC",
      23377: "E6DD",
      23379: "E6DE",
      23394: "E6DF",
      39541: "E6E0",
      39543: "E6E1",
      39544: "E6E2",
      39546: "E6E3",
      39551: "E6E4",
      39549: "E6E5",
      39552: "E6E6",
      39553: "E6E7",
      39557: "E6E8",
      39560: "E6E9",
      39562: "E6EA",
      39568: "E6EB",
      39570: "E6EC",
      39571: "E6ED",
      39574: "E6EE",
      39576: "E6EF",
      39579: "E6F0",
      39580: "E6F1",
      39581: "E6F2",
      39583: "E6F3",
      39584: "E6F4",
      39586: "E6F5",
      39587: "E6F6",
      39589: "E6F7",
      39591: "E6F8",
      32415: "E6F9",
      32417: "E6FA",
      32419: "E6FB",
      32421: "E6FC",
      32424: "E6FD",
      32425: "E6FE",
      32429: "E7A1",
      32432: "E7A2",
      32446: "E7A3",
      32448: "E7A4",
      32449: "E7A5",
      32450: "E7A6",
      32457: "E7A7",
      32459: "E7A8",
      32460: "E7A9",
      32464: "E7AA",
      32468: "E7AB",
      32471: "E7AC",
      32475: "E7AD",
      32480: "E7AE",
      32481: "E7AF",
      32488: "E7B0",
      32491: "E7B1",
      32494: "E7B2",
      32495: "E7B3",
      32497: "E7B4",
      32498: "E7B5",
      32525: "E7B6",
      32502: "E7B7",
      32506: "E7B8",
      32507: "E7B9",
      32510: "E7BA",
      32513: "E7BB",
      32514: "E7BC",
      32515: "E7BD",
      32519: "E7BE",
      32520: "E7BF",
      32523: "E7C0",
      32524: "E7C1",
      32527: "E7C2",
      32529: "E7C3",
      32530: "E7C4",
      32535: "E7C5",
      32537: "E7C6",
      32540: "E7C7",
      32539: "E7C8",
      32543: "E7C9",
      32545: "E7CA",
      32546: "E7CB",
      32547: "E7CC",
      32548: "E7CD",
      32549: "E7CE",
      32550: "E7CF",
      32551: "E7D0",
      32554: "E7D1",
      32555: "E7D2",
      32556: "E7D3",
      32557: "E7D4",
      32559: "E7D5",
      32560: "E7D6",
      32561: "E7D7",
      32562: "E7D8",
      32563: "E7D9",
      32565: "E7DA",
      24186: "E7DB",
      30079: "E7DC",
      24027: "E7DD",
      30014: "E7DE",
      37013: "E7DF",
      29582: "E7E0",
      29585: "E7E1",
      29614: "E7E2",
      29602: "E7E3",
      29599: "E7E4",
      29647: "E7E5",
      29634: "E7E6",
      29649: "E7E7",
      29623: "E7E8",
      29619: "E7E9",
      29632: "E7EA",
      29641: "E7EB",
      29640: "E7EC",
      29669: "E7ED",
      29657: "E7EE",
      39036: "E7EF",
      29706: "E7F0",
      29673: "E7F1",
      29671: "E7F2",
      29662: "E7F3",
      29626: "E7F4",
      29682: "E7F5",
      29711: "E7F6",
      29738: "E7F7",
      29787: "E7F8",
      29734: "E7F9",
      29733: "E7FA",
      29736: "E7FB",
      29744: "E7FC",
      29742: "E7FD",
      29740: "E7FE",
      29723: "E8A1",
      29722: "E8A2",
      29761: "E8A3",
      29788: "E8A4",
      29783: "E8A5",
      29781: "E8A6",
      29785: "E8A7",
      29815: "E8A8",
      29805: "E8A9",
      29822: "E8AA",
      29852: "E8AB",
      29838: "E8AC",
      29824: "E8AD",
      29825: "E8AE",
      29831: "E8AF",
      29835: "E8B0",
      29854: "E8B1",
      29864: "E8B2",
      29865: "E8B3",
      29840: "E8B4",
      29863: "E8B5",
      29906: "E8B6",
      29882: "E8B7",
      38890: "E8B8",
      38891: "E8B9",
      38892: "E8BA",
      26444: "E8BB",
      26451: "E8BC",
      26462: "E8BD",
      26440: "E8BE",
      26473: "E8BF",
      26533: "E8C0",
      26503: "E8C1",
      26474: "E8C2",
      26483: "E8C3",
      26520: "E8C4",
      26535: "E8C5",
      26485: "E8C6",
      26536: "E8C7",
      26526: "E8C8",
      26541: "E8C9",
      26507: "E8CA",
      26487: "E8CB",
      26492: "E8CC",
      26608: "E8CD",
      26633: "E8CE",
      26584: "E8CF",
      26634: "E8D0",
      26601: "E8D1",
      26544: "E8D2",
      26636: "E8D3",
      26585: "E8D4",
      26549: "E8D5",
      26586: "E8D6",
      26547: "E8D7",
      26589: "E8D8",
      26624: "E8D9",
      26563: "E8DA",
      26552: "E8DB",
      26594: "E8DC",
      26638: "E8DD",
      26561: "E8DE",
      26621: "E8DF",
      26674: "E8E0",
      26675: "E8E1",
      26720: "E8E2",
      26721: "E8E3",
      26702: "E8E4",
      26722: "E8E5",
      26692: "E8E6",
      26724: "E8E7",
      26755: "E8E8",
      26653: "E8E9",
      26709: "E8EA",
      26726: "E8EB",
      26689: "E8EC",
      26727: "E8ED",
      26688: "E8EE",
      26686: "E8EF",
      26698: "E8F0",
      26697: "E8F1",
      26665: "E8F2",
      26805: "E8F3",
      26767: "E8F4",
      26740: "E8F5",
      26743: "E8F6",
      26771: "E8F7",
      26731: "E8F8",
      26818: "E8F9",
      26990: "E8FA",
      26876: "E8FB",
      26911: "E8FC",
      26912: "E8FD",
      26873: "E8FE",
      26916: "E9A1",
      26864: "E9A2",
      26891: "E9A3",
      26881: "E9A4",
      26967: "E9A5",
      26851: "E9A6",
      26896: "E9A7",
      26993: "E9A8",
      26937: "E9A9",
      26976: "E9AA",
      26946: "E9AB",
      26973: "E9AC",
      27012: "E9AD",
      26987: "E9AE",
      27008: "E9AF",
      27032: "E9B0",
      27e3: "E9B1",
      26932: "E9B2",
      27084: "E9B3",
      27015: "E9B4",
      27016: "E9B5",
      27086: "E9B6",
      27017: "E9B7",
      26982: "E9B8",
      26979: "E9B9",
      27001: "E9BA",
      27035: "E9BB",
      27047: "E9BC",
      27067: "E9BD",
      27051: "E9BE",
      27053: "E9BF",
      27092: "E9C0",
      27057: "E9C1",
      27073: "E9C2",
      27082: "E9C3",
      27103: "E9C4",
      27029: "E9C5",
      27104: "E9C6",
      27021: "E9C7",
      27135: "E9C8",
      27183: "E9C9",
      27117: "E9CA",
      27159: "E9CB",
      27160: "E9CC",
      27237: "E9CD",
      27122: "E9CE",
      27204: "E9CF",
      27198: "E9D0",
      27296: "E9D1",
      27216: "E9D2",
      27227: "E9D3",
      27189: "E9D4",
      27278: "E9D5",
      27257: "E9D6",
      27197: "E9D7",
      27176: "E9D8",
      27224: "E9D9",
      27260: "E9DA",
      27281: "E9DB",
      27280: "E9DC",
      27305: "E9DD",
      27287: "E9DE",
      27307: "E9DF",
      29495: "E9E0",
      29522: "E9E1",
      27521: "E9E2",
      27522: "E9E3",
      27527: "E9E4",
      27524: "E9E5",
      27538: "E9E6",
      27539: "E9E7",
      27533: "E9E8",
      27546: "E9E9",
      27547: "E9EA",
      27553: "E9EB",
      27562: "E9EC",
      36715: "E9ED",
      36717: "E9EE",
      36721: "E9EF",
      36722: "E9F0",
      36723: "E9F1",
      36725: "E9F2",
      36726: "E9F3",
      36728: "E9F4",
      36727: "E9F5",
      36729: "E9F6",
      36730: "E9F7",
      36732: "E9F8",
      36734: "E9F9",
      36737: "E9FA",
      36738: "E9FB",
      36740: "E9FC",
      36743: "E9FD",
      36747: "E9FE",
      36749: "EAA1",
      36750: "EAA2",
      36751: "EAA3",
      36760: "EAA4",
      36762: "EAA5",
      36558: "EAA6",
      25099: "EAA7",
      25111: "EAA8",
      25115: "EAA9",
      25119: "EAAA",
      25122: "EAAB",
      25121: "EAAC",
      25125: "EAAD",
      25124: "EAAE",
      25132: "EAAF",
      33255: "EAB0",
      29935: "EAB1",
      29940: "EAB2",
      29951: "EAB3",
      29967: "EAB4",
      29969: "EAB5",
      29971: "EAB6",
      25908: "EAB7",
      26094: "EAB8",
      26095: "EAB9",
      26096: "EABA",
      26122: "EABB",
      26137: "EABC",
      26482: "EABD",
      26115: "EABE",
      26133: "EABF",
      26112: "EAC0",
      28805: "EAC1",
      26359: "EAC2",
      26141: "EAC3",
      26164: "EAC4",
      26161: "EAC5",
      26166: "EAC6",
      26165: "EAC7",
      32774: "EAC8",
      26207: "EAC9",
      26196: "EACA",
      26177: "EACB",
      26191: "EACC",
      26198: "EACD",
      26209: "EACE",
      26199: "EACF",
      26231: "EAD0",
      26244: "EAD1",
      26252: "EAD2",
      26279: "EAD3",
      26269: "EAD4",
      26302: "EAD5",
      26331: "EAD6",
      26332: "EAD7",
      26342: "EAD8",
      26345: "EAD9",
      36146: "EADA",
      36147: "EADB",
      36150: "EADC",
      36155: "EADD",
      36157: "EADE",
      36160: "EADF",
      36165: "EAE0",
      36166: "EAE1",
      36168: "EAE2",
      36169: "EAE3",
      36167: "EAE4",
      36173: "EAE5",
      36181: "EAE6",
      36185: "EAE7",
      35271: "EAE8",
      35274: "EAE9",
      35275: "EAEA",
      35276: "EAEB",
      35278: "EAEC",
      35279: "EAED",
      35280: "EAEE",
      35281: "EAEF",
      29294: "EAF0",
      29343: "EAF1",
      29277: "EAF2",
      29286: "EAF3",
      29295: "EAF4",
      29310: "EAF5",
      29311: "EAF6",
      29316: "EAF7",
      29323: "EAF8",
      29325: "EAF9",
      29327: "EAFA",
      29330: "EAFB",
      25352: "EAFC",
      25394: "EAFD",
      25520: "EAFE",
      25663: "EBA1",
      25816: "EBA2",
      32772: "EBA3",
      27626: "EBA4",
      27635: "EBA5",
      27645: "EBA6",
      27637: "EBA7",
      27641: "EBA8",
      27653: "EBA9",
      27655: "EBAA",
      27654: "EBAB",
      27661: "EBAC",
      27669: "EBAD",
      27672: "EBAE",
      27673: "EBAF",
      27674: "EBB0",
      27681: "EBB1",
      27689: "EBB2",
      27684: "EBB3",
      27690: "EBB4",
      27698: "EBB5",
      25909: "EBB6",
      25941: "EBB7",
      25963: "EBB8",
      29261: "EBB9",
      29266: "EBBA",
      29270: "EBBB",
      29232: "EBBC",
      34402: "EBBD",
      21014: "EBBE",
      32927: "EBBF",
      32924: "EBC0",
      32915: "EBC1",
      32956: "EBC2",
      26378: "EBC3",
      32957: "EBC4",
      32945: "EBC5",
      32939: "EBC6",
      32941: "EBC7",
      32948: "EBC8",
      32951: "EBC9",
      32999: "EBCA",
      33e3: "EBCB",
      33001: "EBCC",
      33002: "EBCD",
      32987: "EBCE",
      32962: "EBCF",
      32964: "EBD0",
      32985: "EBD1",
      32973: "EBD2",
      32983: "EBD3",
      26384: "EBD4",
      32989: "EBD5",
      33003: "EBD6",
      33009: "EBD7",
      33012: "EBD8",
      33005: "EBD9",
      33037: "EBDA",
      33038: "EBDB",
      33010: "EBDC",
      33020: "EBDD",
      26389: "EBDE",
      33042: "EBDF",
      35930: "EBE0",
      33078: "EBE1",
      33054: "EBE2",
      33068: "EBE3",
      33048: "EBE4",
      33074: "EBE5",
      33096: "EBE6",
      33100: "EBE7",
      33107: "EBE8",
      33140: "EBE9",
      33113: "EBEA",
      33114: "EBEB",
      33137: "EBEC",
      33120: "EBED",
      33129: "EBEE",
      33148: "EBEF",
      33149: "EBF0",
      33133: "EBF1",
      33127: "EBF2",
      22605: "EBF3",
      23221: "EBF4",
      33160: "EBF5",
      33154: "EBF6",
      33169: "EBF7",
      28373: "EBF8",
      33187: "EBF9",
      33194: "EBFA",
      33228: "EBFB",
      26406: "EBFC",
      33226: "EBFD",
      33211: "EBFE",
      33217: "ECA1",
      33190: "ECA2",
      27428: "ECA3",
      27447: "ECA4",
      27449: "ECA5",
      27459: "ECA6",
      27462: "ECA7",
      27481: "ECA8",
      39121: "ECA9",
      39122: "ECAA",
      39123: "ECAB",
      39125: "ECAC",
      39129: "ECAD",
      39130: "ECAE",
      27571: "ECAF",
      24384: "ECB0",
      27586: "ECB1",
      35315: "ECB2",
      26e3: "ECB3",
      40785: "ECB4",
      26003: "ECB5",
      26044: "ECB6",
      26054: "ECB7",
      26052: "ECB8",
      26051: "ECB9",
      26060: "ECBA",
      26062: "ECBB",
      26066: "ECBC",
      26070: "ECBD",
      28800: "ECBE",
      28828: "ECBF",
      28822: "ECC0",
      28829: "ECC1",
      28859: "ECC2",
      28864: "ECC3",
      28855: "ECC4",
      28843: "ECC5",
      28849: "ECC6",
      28904: "ECC7",
      28874: "ECC8",
      28944: "ECC9",
      28947: "ECCA",
      28950: "ECCB",
      28975: "ECCC",
      28977: "ECCD",
      29043: "ECCE",
      29020: "ECCF",
      29032: "ECD0",
      28997: "ECD1",
      29042: "ECD2",
      29002: "ECD3",
      29048: "ECD4",
      29050: "ECD5",
      29080: "ECD6",
      29107: "ECD7",
      29109: "ECD8",
      29096: "ECD9",
      29088: "ECDA",
      29152: "ECDB",
      29140: "ECDC",
      29159: "ECDD",
      29177: "ECDE",
      29213: "ECDF",
      29224: "ECE0",
      28780: "ECE1",
      28952: "ECE2",
      29030: "ECE3",
      29113: "ECE4",
      25150: "ECE5",
      25149: "ECE6",
      25155: "ECE7",
      25160: "ECE8",
      25161: "ECE9",
      31035: "ECEA",
      31040: "ECEB",
      31046: "ECEC",
      31049: "ECED",
      31067: "ECEE",
      31068: "ECEF",
      31059: "ECF0",
      31066: "ECF1",
      31074: "ECF2",
      31063: "ECF3",
      31072: "ECF4",
      31087: "ECF5",
      31079: "ECF6",
      31098: "ECF7",
      31109: "ECF8",
      31114: "ECF9",
      31130: "ECFA",
      31143: "ECFB",
      31155: "ECFC",
      24529: "ECFD",
      24528: "ECFE",
      24636: "EDA1",
      24669: "EDA2",
      24666: "EDA3",
      24679: "EDA4",
      24641: "EDA5",
      24665: "EDA6",
      24675: "EDA7",
      24747: "EDA8",
      24838: "EDA9",
      24845: "EDAA",
      24925: "EDAB",
      25001: "EDAC",
      24989: "EDAD",
      25035: "EDAE",
      25041: "EDAF",
      25094: "EDB0",
      32896: "EDB1",
      32895: "EDB2",
      27795: "EDB3",
      27894: "EDB4",
      28156: "EDB5",
      30710: "EDB6",
      30712: "EDB7",
      30720: "EDB8",
      30729: "EDB9",
      30743: "EDBA",
      30744: "EDBB",
      30737: "EDBC",
      26027: "EDBD",
      30765: "EDBE",
      30748: "EDBF",
      30749: "EDC0",
      30777: "EDC1",
      30778: "EDC2",
      30779: "EDC3",
      30751: "EDC4",
      30780: "EDC5",
      30757: "EDC6",
      30764: "EDC7",
      30755: "EDC8",
      30761: "EDC9",
      30798: "EDCA",
      30829: "EDCB",
      30806: "EDCC",
      30807: "EDCD",
      30758: "EDCE",
      30800: "EDCF",
      30791: "EDD0",
      30796: "EDD1",
      30826: "EDD2",
      30875: "EDD3",
      30867: "EDD4",
      30874: "EDD5",
      30855: "EDD6",
      30876: "EDD7",
      30881: "EDD8",
      30883: "EDD9",
      30898: "EDDA",
      30905: "EDDB",
      30885: "EDDC",
      30932: "EDDD",
      30937: "EDDE",
      30921: "EDDF",
      30956: "EDE0",
      30962: "EDE1",
      30981: "EDE2",
      30964: "EDE3",
      30995: "EDE4",
      31012: "EDE5",
      31006: "EDE6",
      31028: "EDE7",
      40859: "EDE8",
      40697: "EDE9",
      40699: "EDEA",
      40700: "EDEB",
      30449: "EDEC",
      30468: "EDED",
      30477: "EDEE",
      30457: "EDEF",
      30471: "EDF0",
      30472: "EDF1",
      30490: "EDF2",
      30498: "EDF3",
      30489: "EDF4",
      30509: "EDF5",
      30502: "EDF6",
      30517: "EDF7",
      30520: "EDF8",
      30544: "EDF9",
      30545: "EDFA",
      30535: "EDFB",
      30531: "EDFC",
      30554: "EDFD",
      30568: "EDFE",
      30562: "EEA1",
      30565: "EEA2",
      30591: "EEA3",
      30605: "EEA4",
      30589: "EEA5",
      30592: "EEA6",
      30604: "EEA7",
      30609: "EEA8",
      30623: "EEA9",
      30624: "EEAA",
      30640: "EEAB",
      30645: "EEAC",
      30653: "EEAD",
      30010: "EEAE",
      30016: "EEAF",
      30030: "EEB0",
      30027: "EEB1",
      30024: "EEB2",
      30043: "EEB3",
      30066: "EEB4",
      30073: "EEB5",
      30083: "EEB6",
      32600: "EEB7",
      32609: "EEB8",
      32607: "EEB9",
      35400: "EEBA",
      32616: "EEBB",
      32628: "EEBC",
      32625: "EEBD",
      32633: "EEBE",
      32641: "EEBF",
      32638: "EEC0",
      30413: "EEC1",
      30437: "EEC2",
      34866: "EEC3",
      38021: "EEC4",
      38022: "EEC5",
      38023: "EEC6",
      38027: "EEC7",
      38026: "EEC8",
      38028: "EEC9",
      38029: "EECA",
      38031: "EECB",
      38032: "EECC",
      38036: "EECD",
      38039: "EECE",
      38037: "EECF",
      38042: "EED0",
      38043: "EED1",
      38044: "EED2",
      38051: "EED3",
      38052: "EED4",
      38059: "EED5",
      38058: "EED6",
      38061: "EED7",
      38060: "EED8",
      38063: "EED9",
      38064: "EEDA",
      38066: "EEDB",
      38068: "EEDC",
      38070: "EEDD",
      38071: "EEDE",
      38072: "EEDF",
      38073: "EEE0",
      38074: "EEE1",
      38076: "EEE2",
      38077: "EEE3",
      38079: "EEE4",
      38084: "EEE5",
      38088: "EEE6",
      38089: "EEE7",
      38090: "EEE8",
      38091: "EEE9",
      38092: "EEEA",
      38093: "EEEB",
      38094: "EEEC",
      38096: "EEED",
      38097: "EEEE",
      38098: "EEEF",
      38101: "EEF0",
      38102: "EEF1",
      38103: "EEF2",
      38105: "EEF3",
      38104: "EEF4",
      38107: "EEF5",
      38110: "EEF6",
      38111: "EEF7",
      38112: "EEF8",
      38114: "EEF9",
      38116: "EEFA",
      38117: "EEFB",
      38119: "EEFC",
      38120: "EEFD",
      38122: "EEFE",
      38121: "EFA1",
      38123: "EFA2",
      38126: "EFA3",
      38127: "EFA4",
      38131: "EFA5",
      38132: "EFA6",
      38133: "EFA7",
      38135: "EFA8",
      38137: "EFA9",
      38140: "EFAA",
      38141: "EFAB",
      38143: "EFAC",
      38147: "EFAD",
      38146: "EFAE",
      38150: "EFAF",
      38151: "EFB0",
      38153: "EFB1",
      38154: "EFB2",
      38157: "EFB3",
      38158: "EFB4",
      38159: "EFB5",
      38162: "EFB6",
      38163: "EFB7",
      38164: "EFB8",
      38165: "EFB9",
      38166: "EFBA",
      38168: "EFBB",
      38171: "EFBC",
      38173: "EFBD",
      38174: "EFBE",
      38175: "EFBF",
      38178: "EFC0",
      38186: "EFC1",
      38187: "EFC2",
      38185: "EFC3",
      38188: "EFC4",
      38193: "EFC5",
      38194: "EFC6",
      38196: "EFC7",
      38198: "EFC8",
      38199: "EFC9",
      38200: "EFCA",
      38204: "EFCB",
      38206: "EFCC",
      38207: "EFCD",
      38210: "EFCE",
      38197: "EFCF",
      38212: "EFD0",
      38213: "EFD1",
      38214: "EFD2",
      38217: "EFD3",
      38220: "EFD4",
      38222: "EFD5",
      38223: "EFD6",
      38226: "EFD7",
      38227: "EFD8",
      38228: "EFD9",
      38230: "EFDA",
      38231: "EFDB",
      38232: "EFDC",
      38233: "EFDD",
      38235: "EFDE",
      38238: "EFDF",
      38239: "EFE0",
      38237: "EFE1",
      38241: "EFE2",
      38242: "EFE3",
      38244: "EFE4",
      38245: "EFE5",
      38246: "EFE6",
      38247: "EFE7",
      38248: "EFE8",
      38249: "EFE9",
      38250: "EFEA",
      38251: "EFEB",
      38252: "EFEC",
      38255: "EFED",
      38257: "EFEE",
      38258: "EFEF",
      38259: "EFF0",
      38202: "EFF1",
      30695: "EFF2",
      30700: "EFF3",
      38601: "EFF4",
      31189: "EFF5",
      31213: "EFF6",
      31203: "EFF7",
      31211: "EFF8",
      31238: "EFF9",
      23879: "EFFA",
      31235: "EFFB",
      31234: "EFFC",
      31262: "EFFD",
      31252: "EFFE",
      31289: "F0A1",
      31287: "F0A2",
      31313: "F0A3",
      40655: "F0A4",
      39333: "F0A5",
      31344: "F0A6",
      30344: "F0A7",
      30350: "F0A8",
      30355: "F0A9",
      30361: "F0AA",
      30372: "F0AB",
      29918: "F0AC",
      29920: "F0AD",
      29996: "F0AE",
      40480: "F0AF",
      40482: "F0B0",
      40488: "F0B1",
      40489: "F0B2",
      40490: "F0B3",
      40491: "F0B4",
      40492: "F0B5",
      40498: "F0B6",
      40497: "F0B7",
      40502: "F0B8",
      40504: "F0B9",
      40503: "F0BA",
      40505: "F0BB",
      40506: "F0BC",
      40510: "F0BD",
      40513: "F0BE",
      40514: "F0BF",
      40516: "F0C0",
      40518: "F0C1",
      40519: "F0C2",
      40520: "F0C3",
      40521: "F0C4",
      40523: "F0C5",
      40524: "F0C6",
      40526: "F0C7",
      40529: "F0C8",
      40533: "F0C9",
      40535: "F0CA",
      40538: "F0CB",
      40539: "F0CC",
      40540: "F0CD",
      40542: "F0CE",
      40547: "F0CF",
      40550: "F0D0",
      40551: "F0D1",
      40552: "F0D2",
      40553: "F0D3",
      40554: "F0D4",
      40555: "F0D5",
      40556: "F0D6",
      40561: "F0D7",
      40557: "F0D8",
      40563: "F0D9",
      30098: "F0DA",
      30100: "F0DB",
      30102: "F0DC",
      30112: "F0DD",
      30109: "F0DE",
      30124: "F0DF",
      30115: "F0E0",
      30131: "F0E1",
      30132: "F0E2",
      30136: "F0E3",
      30148: "F0E4",
      30129: "F0E5",
      30128: "F0E6",
      30147: "F0E7",
      30146: "F0E8",
      30166: "F0E9",
      30157: "F0EA",
      30179: "F0EB",
      30184: "F0EC",
      30182: "F0ED",
      30180: "F0EE",
      30187: "F0EF",
      30183: "F0F0",
      30211: "F0F1",
      30193: "F0F2",
      30204: "F0F3",
      30207: "F0F4",
      30224: "F0F5",
      30208: "F0F6",
      30213: "F0F7",
      30220: "F0F8",
      30231: "F0F9",
      30218: "F0FA",
      30245: "F0FB",
      30232: "F0FC",
      30229: "F0FD",
      30233: "F0FE",
      30235: "F1A1",
      30268: "F1A2",
      30242: "F1A3",
      30240: "F1A4",
      30272: "F1A5",
      30253: "F1A6",
      30256: "F1A7",
      30271: "F1A8",
      30261: "F1A9",
      30275: "F1AA",
      30270: "F1AB",
      30259: "F1AC",
      30285: "F1AD",
      30302: "F1AE",
      30292: "F1AF",
      30300: "F1B0",
      30294: "F1B1",
      30315: "F1B2",
      30319: "F1B3",
      32714: "F1B4",
      31462: "F1B5",
      31352: "F1B6",
      31353: "F1B7",
      31360: "F1B8",
      31366: "F1B9",
      31368: "F1BA",
      31381: "F1BB",
      31398: "F1BC",
      31392: "F1BD",
      31404: "F1BE",
      31400: "F1BF",
      31405: "F1C0",
      31411: "F1C1",
      34916: "F1C2",
      34921: "F1C3",
      34930: "F1C4",
      34941: "F1C5",
      34943: "F1C6",
      34946: "F1C7",
      34978: "F1C8",
      35014: "F1C9",
      34999: "F1CA",
      35004: "F1CB",
      35017: "F1CC",
      35042: "F1CD",
      35022: "F1CE",
      35043: "F1CF",
      35045: "F1D0",
      35057: "F1D1",
      35098: "F1D2",
      35068: "F1D3",
      35048: "F1D4",
      35070: "F1D5",
      35056: "F1D6",
      35105: "F1D7",
      35097: "F1D8",
      35091: "F1D9",
      35099: "F1DA",
      35082: "F1DB",
      35124: "F1DC",
      35115: "F1DD",
      35126: "F1DE",
      35137: "F1DF",
      35174: "F1E0",
      35195: "F1E1",
      30091: "F1E2",
      32997: "F1E3",
      30386: "F1E4",
      30388: "F1E5",
      30684: "F1E6",
      32786: "F1E7",
      32788: "F1E8",
      32790: "F1E9",
      32796: "F1EA",
      32800: "F1EB",
      32802: "F1EC",
      32805: "F1ED",
      32806: "F1EE",
      32807: "F1EF",
      32809: "F1F0",
      32808: "F1F1",
      32817: "F1F2",
      32779: "F1F3",
      32821: "F1F4",
      32835: "F1F5",
      32838: "F1F6",
      32845: "F1F7",
      32850: "F1F8",
      32873: "F1F9",
      32881: "F1FA",
      35203: "F1FB",
      39032: "F1FC",
      39040: "F1FD",
      39043: "F1FE",
      39049: "F2A1",
      39052: "F2A2",
      39053: "F2A3",
      39055: "F2A4",
      39060: "F2A5",
      39066: "F2A6",
      39067: "F2A7",
      39070: "F2A8",
      39071: "F2A9",
      39073: "F2AA",
      39074: "F2AB",
      39077: "F2AC",
      39078: "F2AD",
      34381: "F2AE",
      34388: "F2AF",
      34412: "F2B0",
      34414: "F2B1",
      34431: "F2B2",
      34426: "F2B3",
      34428: "F2B4",
      34427: "F2B5",
      34472: "F2B6",
      34445: "F2B7",
      34443: "F2B8",
      34476: "F2B9",
      34461: "F2BA",
      34471: "F2BB",
      34467: "F2BC",
      34474: "F2BD",
      34451: "F2BE",
      34473: "F2BF",
      34486: "F2C0",
      34500: "F2C1",
      34485: "F2C2",
      34510: "F2C3",
      34480: "F2C4",
      34490: "F2C5",
      34481: "F2C6",
      34479: "F2C7",
      34505: "F2C8",
      34511: "F2C9",
      34484: "F2CA",
      34537: "F2CB",
      34545: "F2CC",
      34546: "F2CD",
      34541: "F2CE",
      34547: "F2CF",
      34512: "F2D0",
      34579: "F2D1",
      34526: "F2D2",
      34548: "F2D3",
      34527: "F2D4",
      34520: "F2D5",
      34513: "F2D6",
      34563: "F2D7",
      34567: "F2D8",
      34552: "F2D9",
      34568: "F2DA",
      34570: "F2DB",
      34573: "F2DC",
      34569: "F2DD",
      34595: "F2DE",
      34619: "F2DF",
      34590: "F2E0",
      34597: "F2E1",
      34606: "F2E2",
      34586: "F2E3",
      34622: "F2E4",
      34632: "F2E5",
      34612: "F2E6",
      34609: "F2E7",
      34601: "F2E8",
      34615: "F2E9",
      34623: "F2EA",
      34690: "F2EB",
      34594: "F2EC",
      34685: "F2ED",
      34686: "F2EE",
      34683: "F2EF",
      34656: "F2F0",
      34672: "F2F1",
      34636: "F2F2",
      34670: "F2F3",
      34699: "F2F4",
      34643: "F2F5",
      34659: "F2F6",
      34684: "F2F7",
      34660: "F2F8",
      34649: "F2F9",
      34661: "F2FA",
      34707: "F2FB",
      34735: "F2FC",
      34728: "F2FD",
      34770: "F2FE",
      34758: "F3A1",
      34696: "F3A2",
      34693: "F3A3",
      34733: "F3A4",
      34711: "F3A5",
      34691: "F3A6",
      34731: "F3A7",
      34789: "F3A8",
      34732: "F3A9",
      34741: "F3AA",
      34739: "F3AB",
      34763: "F3AC",
      34771: "F3AD",
      34749: "F3AE",
      34769: "F3AF",
      34752: "F3B0",
      34762: "F3B1",
      34779: "F3B2",
      34794: "F3B3",
      34784: "F3B4",
      34798: "F3B5",
      34838: "F3B6",
      34835: "F3B7",
      34814: "F3B8",
      34826: "F3B9",
      34843: "F3BA",
      34849: "F3BB",
      34873: "F3BC",
      34876: "F3BD",
      32566: "F3BE",
      32578: "F3BF",
      32580: "F3C0",
      32581: "F3C1",
      33296: "F3C2",
      31482: "F3C3",
      31485: "F3C4",
      31496: "F3C5",
      31491: "F3C6",
      31492: "F3C7",
      31509: "F3C8",
      31498: "F3C9",
      31531: "F3CA",
      31503: "F3CB",
      31559: "F3CC",
      31544: "F3CD",
      31530: "F3CE",
      31513: "F3CF",
      31534: "F3D0",
      31537: "F3D1",
      31520: "F3D2",
      31525: "F3D3",
      31524: "F3D4",
      31539: "F3D5",
      31550: "F3D6",
      31518: "F3D7",
      31576: "F3D8",
      31578: "F3D9",
      31557: "F3DA",
      31605: "F3DB",
      31564: "F3DC",
      31581: "F3DD",
      31584: "F3DE",
      31598: "F3DF",
      31611: "F3E0",
      31586: "F3E1",
      31602: "F3E2",
      31601: "F3E3",
      31632: "F3E4",
      31654: "F3E5",
      31655: "F3E6",
      31672: "F3E7",
      31660: "F3E8",
      31645: "F3E9",
      31656: "F3EA",
      31621: "F3EB",
      31658: "F3EC",
      31644: "F3ED",
      31650: "F3EE",
      31659: "F3EF",
      31668: "F3F0",
      31697: "F3F1",
      31681: "F3F2",
      31692: "F3F3",
      31709: "F3F4",
      31706: "F3F5",
      31717: "F3F6",
      31718: "F3F7",
      31722: "F3F8",
      31756: "F3F9",
      31742: "F3FA",
      31740: "F3FB",
      31759: "F3FC",
      31766: "F3FD",
      31755: "F3FE",
      31775: "F4A1",
      31786: "F4A2",
      31782: "F4A3",
      31800: "F4A4",
      31809: "F4A5",
      31808: "F4A6",
      33278: "F4A7",
      33281: "F4A8",
      33282: "F4A9",
      33284: "F4AA",
      33260: "F4AB",
      34884: "F4AC",
      33313: "F4AD",
      33314: "F4AE",
      33315: "F4AF",
      33325: "F4B0",
      33327: "F4B1",
      33320: "F4B2",
      33323: "F4B3",
      33336: "F4B4",
      33339: "F4B5",
      33331: "F4B6",
      33332: "F4B7",
      33342: "F4B8",
      33348: "F4B9",
      33353: "F4BA",
      33355: "F4BB",
      33359: "F4BC",
      33370: "F4BD",
      33375: "F4BE",
      33384: "F4BF",
      34942: "F4C0",
      34949: "F4C1",
      34952: "F4C2",
      35032: "F4C3",
      35039: "F4C4",
      35166: "F4C5",
      32669: "F4C6",
      32671: "F4C7",
      32679: "F4C8",
      32687: "F4C9",
      32688: "F4CA",
      32690: "F4CB",
      31868: "F4CC",
      25929: "F4CD",
      31889: "F4CE",
      31901: "F4CF",
      31900: "F4D0",
      31902: "F4D1",
      31906: "F4D2",
      31922: "F4D3",
      31932: "F4D4",
      31933: "F4D5",
      31937: "F4D6",
      31943: "F4D7",
      31948: "F4D8",
      31949: "F4D9",
      31944: "F4DA",
      31941: "F4DB",
      31959: "F4DC",
      31976: "F4DD",
      33390: "F4DE",
      26280: "F4DF",
      32703: "F4E0",
      32718: "F4E1",
      32725: "F4E2",
      32741: "F4E3",
      32737: "F4E4",
      32742: "F4E5",
      32745: "F4E6",
      32750: "F4E7",
      32755: "F4E8",
      31992: "F4E9",
      32119: "F4EA",
      32166: "F4EB",
      32174: "F4EC",
      32327: "F4ED",
      32411: "F4EE",
      40632: "F4EF",
      40628: "F4F0",
      36211: "F4F1",
      36228: "F4F2",
      36244: "F4F3",
      36241: "F4F4",
      36273: "F4F5",
      36199: "F4F6",
      36205: "F4F7",
      35911: "F4F8",
      35913: "F4F9",
      37194: "F4FA",
      37200: "F4FB",
      37198: "F4FC",
      37199: "F4FD",
      37220: "F4FE",
      37218: "F5A1",
      37217: "F5A2",
      37232: "F5A3",
      37225: "F5A4",
      37231: "F5A5",
      37245: "F5A6",
      37246: "F5A7",
      37234: "F5A8",
      37236: "F5A9",
      37241: "F5AA",
      37260: "F5AB",
      37253: "F5AC",
      37264: "F5AD",
      37261: "F5AE",
      37265: "F5AF",
      37282: "F5B0",
      37283: "F5B1",
      37290: "F5B2",
      37293: "F5B3",
      37294: "F5B4",
      37295: "F5B5",
      37301: "F5B6",
      37300: "F5B7",
      37306: "F5B8",
      35925: "F5B9",
      40574: "F5BA",
      36280: "F5BB",
      36331: "F5BC",
      36357: "F5BD",
      36441: "F5BE",
      36457: "F5BF",
      36277: "F5C0",
      36287: "F5C1",
      36284: "F5C2",
      36282: "F5C3",
      36292: "F5C4",
      36310: "F5C5",
      36311: "F5C6",
      36314: "F5C7",
      36318: "F5C8",
      36302: "F5C9",
      36303: "F5CA",
      36315: "F5CB",
      36294: "F5CC",
      36332: "F5CD",
      36343: "F5CE",
      36344: "F5CF",
      36323: "F5D0",
      36345: "F5D1",
      36347: "F5D2",
      36324: "F5D3",
      36361: "F5D4",
      36349: "F5D5",
      36372: "F5D6",
      36381: "F5D7",
      36383: "F5D8",
      36396: "F5D9",
      36398: "F5DA",
      36387: "F5DB",
      36399: "F5DC",
      36410: "F5DD",
      36416: "F5DE",
      36409: "F5DF",
      36405: "F5E0",
      36413: "F5E1",
      36401: "F5E2",
      36425: "F5E3",
      36417: "F5E4",
      36418: "F5E5",
      36433: "F5E6",
      36434: "F5E7",
      36426: "F5E8",
      36464: "F5E9",
      36470: "F5EA",
      36476: "F5EB",
      36463: "F5EC",
      36468: "F5ED",
      36485: "F5EE",
      36495: "F5EF",
      36500: "F5F0",
      36496: "F5F1",
      36508: "F5F2",
      36510: "F5F3",
      35960: "F5F4",
      35970: "F5F5",
      35978: "F5F6",
      35973: "F5F7",
      35992: "F5F8",
      35988: "F5F9",
      26011: "F5FA",
      35286: "F5FB",
      35294: "F5FC",
      35290: "F5FD",
      35292: "F5FE",
      35301: "F6A1",
      35307: "F6A2",
      35311: "F6A3",
      35390: "F6A4",
      35622: "F6A5",
      38739: "F6A6",
      38633: "F6A7",
      38643: "F6A8",
      38639: "F6A9",
      38662: "F6AA",
      38657: "F6AB",
      38664: "F6AC",
      38671: "F6AD",
      38670: "F6AE",
      38698: "F6AF",
      38701: "F6B0",
      38704: "F6B1",
      38718: "F6B2",
      40832: "F6B3",
      40835: "F6B4",
      40837: "F6B5",
      40838: "F6B6",
      40839: "F6B7",
      40840: "F6B8",
      40841: "F6B9",
      40842: "F6BA",
      40844: "F6BB",
      40702: "F6BC",
      40715: "F6BD",
      40717: "F6BE",
      38585: "F6BF",
      38588: "F6C0",
      38589: "F6C1",
      38606: "F6C2",
      38610: "F6C3",
      30655: "F6C4",
      38624: "F6C5",
      37518: "F6C6",
      37550: "F6C7",
      37576: "F6C8",
      37694: "F6C9",
      37738: "F6CA",
      37834: "F6CB",
      37775: "F6CC",
      37950: "F6CD",
      37995: "F6CE",
      40063: "F6CF",
      40066: "F6D0",
      40069: "F6D1",
      40070: "F6D2",
      40071: "F6D3",
      40072: "F6D4",
      31267: "F6D5",
      40075: "F6D6",
      40078: "F6D7",
      40080: "F6D8",
      40081: "F6D9",
      40082: "F6DA",
      40084: "F6DB",
      40085: "F6DC",
      40090: "F6DD",
      40091: "F6DE",
      40094: "F6DF",
      40095: "F6E0",
      40096: "F6E1",
      40097: "F6E2",
      40098: "F6E3",
      40099: "F6E4",
      40101: "F6E5",
      40102: "F6E6",
      40103: "F6E7",
      40104: "F6E8",
      40105: "F6E9",
      40107: "F6EA",
      40109: "F6EB",
      40110: "F6EC",
      40112: "F6ED",
      40113: "F6EE",
      40114: "F6EF",
      40115: "F6F0",
      40116: "F6F1",
      40117: "F6F2",
      40118: "F6F3",
      40119: "F6F4",
      40122: "F6F5",
      40123: "F6F6",
      40124: "F6F7",
      40125: "F6F8",
      40132: "F6F9",
      40133: "F6FA",
      40134: "F6FB",
      40135: "F6FC",
      40138: "F6FD",
      40139: "F6FE",
      40140: "F7A1",
      40141: "F7A2",
      40142: "F7A3",
      40143: "F7A4",
      40144: "F7A5",
      40147: "F7A6",
      40148: "F7A7",
      40149: "F7A8",
      40151: "F7A9",
      40152: "F7AA",
      40153: "F7AB",
      40156: "F7AC",
      40157: "F7AD",
      40159: "F7AE",
      40162: "F7AF",
      38780: "F7B0",
      38789: "F7B1",
      38801: "F7B2",
      38802: "F7B3",
      38804: "F7B4",
      38831: "F7B5",
      38827: "F7B6",
      38819: "F7B7",
      38834: "F7B8",
      38836: "F7B9",
      39601: "F7BA",
      39600: "F7BB",
      39607: "F7BC",
      40536: "F7BD",
      39606: "F7BE",
      39610: "F7BF",
      39612: "F7C0",
      39617: "F7C1",
      39616: "F7C2",
      39621: "F7C3",
      39618: "F7C4",
      39627: "F7C5",
      39628: "F7C6",
      39633: "F7C7",
      39749: "F7C8",
      39747: "F7C9",
      39751: "F7CA",
      39753: "F7CB",
      39752: "F7CC",
      39757: "F7CD",
      39761: "F7CE",
      39144: "F7CF",
      39181: "F7D0",
      39214: "F7D1",
      39253: "F7D2",
      39252: "F7D3",
      39647: "F7D4",
      39649: "F7D5",
      39654: "F7D6",
      39663: "F7D7",
      39659: "F7D8",
      39675: "F7D9",
      39661: "F7DA",
      39673: "F7DB",
      39688: "F7DC",
      39695: "F7DD",
      39699: "F7DE",
      39711: "F7DF",
      39715: "F7E0",
      40637: "F7E1",
      40638: "F7E2",
      32315: "F7E3",
      40578: "F7E4",
      40583: "F7E5",
      40584: "F7E6",
      40587: "F7E7",
      40594: "F7E8",
      37846: "F7E9",
      40605: "F7EA",
      40607: "F7EB",
      40667: "F7EC",
      40668: "F7ED",
      40669: "F7EE",
      40672: "F7EF",
      40671: "F7F0",
      40674: "F7F1",
      40681: "F7F2",
      40679: "F7F3",
      40677: "F7F4",
      40682: "F7F5",
      40687: "F7F6",
      40738: "F7F7",
      40748: "F7F8",
      40751: "F7F9",
      40761: "F7FA",
      40759: "F7FB",
      40765: "F7FC",
      40766: "F7FD",
      40772: "F7FE"
    };
    var i = 0;
    var l = str.length;
    var ret = [];
    var charCode;
    var gCode;
    for (i = 0; i < l; i++) {
      charCode = str.charCodeAt(i);
      if (charCode <= 127) {
        ret.push("%" + charCode.toString(16));
      } else {
        gCode = map.hasOwnProperty(charCode) && map[charCode];
        if (gCode) {
          while (gCode.length < 4) {
            gCode = "0" + gCode;
          }
          ;
          ret.push("%" + gCode.slice(0, 2) + "%" + gCode.slice(2, 4));
        } else {
        }
        ;
      }
      ;
    }
    ;
    return ret.join("");
  }

  // src/search-engine-jump.js
  (function() {
    "use strict";
    console.log("脚本: 搜索引擎快捷跳转 --- 开始执行 --- 发布者: qxin --- GitHub:https://github.com/qxinGitHub/searchEngineJump ← 问题反馈地址");
    setupTrustedHTMLSupport();
    if (shouldSkipCurrentPage()) {
      console.log("脚本: 搜索引擎快捷跳转 --- 检测到被排除的页面，已停止执行");
      return;
    }
    function iqxinstart() {
      if (shouldSkipCurrentPage()) {
        var removalTargets = document.querySelectorAll("#sej-container, sejspan.sej-drop-list");
        if (removalTargets && removalTargets.length) {
          [].forEach.call(removalTargets, function(elem) {
            if (elem && elem.parentNode) {
              elem.parentNode.removeChild(elem);
            }
          });
        }
        return;
      }
      var rules = [
        // 网页搜索/////////////第一个可以当模板看
        {
          name: "google网页搜索",
          // 你要加载的网站的名字(方便自己查找)
          // 是否启用.
          enabled: true,
          // 在哪个网站上加载,正则.
          url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?!tbm=)(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$|(^https?:\/\/xn--flw351e\.ml\/search\?q=)/,
          // 加载哪个类型的列表:
          // ['web'|'music'|'video'|'image'|'download'|'shopping'|'translate'|'knowledge'|'sociality']
          engineList: "web",
          // 添加一个class, 用来使用目标网站的样式
          class: "s6JM6d",
          // 若固定到顶栏,是否给一个高度
          fixedTop: 72,
          // 固定到顶栏, 兼容ac百度用
          // fixedTop2:88,
          //  给引擎列表的样式
          style: "                    z-index: 100;                    margin-left:-10px;                    ",
          // 给引擎列表的样式 （“style_ACBaidu” 可选,是为了兼容 “AC Baidu” 脚本）
          style_ACBaidu: "                    text-align: center;                    z-index: 100;                    margin-top:-5px;                ",
          // 插入文档,相关
          // target 将引擎跳转工具栏插入到文档的某个元素
          // (请使用xpath匹配,比如: '//*[@id="subform_ctrl"]'  或者 css匹配(请加上 'css;' 的前缀),比如: 'css;#subform_ctrl' );
          // keyword 使用 xpath 或者 css选中一个form input元素 或者 该项是一个函数,使用返回值
          // where 四种:
          // 'beforeBegin'(插入到给定元素的前面) ;
          // 'afterBegin'(作为给定元素的第一个子元素) ;
          // 'beforeEnd' (作为给定元素的最后一个子元素) ;
          // 'afterEnd'(插入到给定元素的后面);.
          insertIntoDoc: {
            // target: 'css;.Gcxb4e',
            target: "css;#center_col",
            // target: 'css;.sBbkle',
            // 若 keyword 使用函数获取
            // keyword: function () {
            // var input = document.getElementById('lst-ib');
            // if (input) return input.value;
            // },
            keyword: '//textarea[@name="q"]',
            where: "afterBegin"
            // where: 'afterEnd',
          },
          // 修改源网页用来适应跳转栏（可选）
          // stylish: 'body.vasq #hdtbMenus.hdtb-td-o{top:100px !important;} #hdtbMenus{top:92px;margin-top:30px;}'
          stylish: "#appbar.hdtb-ab-o{height:0px !important;} #hdtbMenus{position:unset}"
        },
        {
          name: "google-hash-query",
          // 不刷新页面显示搜索结果的google
          enabled: true,
          url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^#]*#(?:&?q=|.+?&q=).+/,
          engineList: "web",
          style: "                    margin-left: 142px;                    z-index: 100;                    margin-top:5px;                ",
          style_ACBaidu: "                    text-align: center;                    z-index: 100;                    margin-top:5px;                ",
          insertIntoDoc: {
            target: "css;#appbar",
            keyword: function() {
              var input = document.getElementById("lst-ib");
              if (input) return input.value;
            },
            where: "beforeBegin"
          },
          stylish: "body.vasq #hdtbMenus.hdtb-td-o{top:100px !important}"
        },
        {
          name: "百度网页搜索",
          url: /^https?:\/\/www\.baidu\.com\/(?:s|baidu)/,
          enabled: true,
          engineList: "web",
          fixedTop: 70,
          fixedTop2: 88,
          // fixedTopTarget: "css;.s_form ",
          fixedTopTarget: "css;#wrapper_wrapper",
          // fixedTopWhere:"beforeEnd",
          fixedTopWhere: "beforeBegin",
          style: "                    margin-top:8px;                    margin-bottom: -5px;                    z-index: 101;                ",
          style_ACBaidu: "                    margin-top: 8px;                    margin-bottom: -5px;                    z-index: 99;                    text-align: center;                    padding-left:0px !important;                    background: rgba(248,248,248,0.4);                    backdrop-filter: blur(10px);                ",
          insertIntoDoc: {
            keyword: "css;input#kw",
            // target: 'css;#s_tab',
            target: "css;#container",
            // where: 'afterEnd',
            where: "afterBegin"
          },
          stylish: ".headBlock,.se_common_hint{display:none !important} #wrapper>.result-molecule{z-index:300 !important} #searchTag{position:unset}"
        },
        {
          name: "必应网页搜索",
          url: /^https?:\/\/[^.]*\.bing\.com\/search/,
          enabled: true,
          engineList: "web",
          style: "                    padding-left:15px;                    margin-top:6px;                    margin-left: 148px;                    margin-bottom:-10px;                ",
          style_ACBaidu: "                    text-align: center;                    margin-left: -120px;                    margin-right: 0px;                    margin-bottom:-20px;                ",
          insertIntoDoc: {
            keyword: "css;#sb_form_q",
            target: "css;#b_content",
            where: "beforeBegin"
          }
        },
        {
          name: "DDG",
          url: /^https?:\/\/duckduckgo\.com\/*/i,
          enabled: true,
          engineList: "web",
          style: "                    margin-top:5px;                ",
          insertIntoDoc: {
            keyword: '//input[@name="q"]',
            target: "css;.results--main",
            where: "beforeBegin"
          }
        },
        {
          name: "雅虎网页搜索",
          url: /^https?:\/\/search\.yahoo\.com\/search/i,
          engineList: "web",
          enabled: true,
          fixedTop: 54,
          style: "                    margin-left:122px;                ",
          insertIntoDoc: {
            keyword: "css;#yschsp",
            target: "css;#horizontal-bar",
            where: "afterBegin"
          }
        },
        {
          name: "雅虎日本网页搜索",
          url: /^https?:\/\/search\.yahoo\.co\.jp\/search/i,
          engineList: "web",
          enabled: true,
          style: "                    margin-left:0px;                    width:1050px;                    display:flex;                    -webkit-box-orient: vertical;                    -webkit-box-direction: normal;                    margin: auto;                ",
          insertIntoDoc: {
            keyword: '//input[@name="p"]',
            target: "css;.Header__inner",
            where: "afterEnd"
          }
        },
        {
          name: "台湾雅虎网页搜索",
          url: /^https?:\/\/tw\.search\.yahoo\.com\/search/i,
          engineList: "web",
          enabled: true,
          fixedTop: 52,
          style: "                    margin-left:-10px;                    margin-bottom:10px;                ",
          insertIntoDoc: {
            keyword: "css;#yschsp",
            target: "css;#results",
            where: "afterBegin"
          }
        },
        {
          name: "searx",
          url: /^https?:\/\/searx\.me\/\?q/i,
          engineList: "web",
          enabled: true,
          style: "                    margin-left:-10px;                    margin-bottom:10px;                ",
          insertIntoDoc: {
            keyword: "css;#q",
            target: "css;#categories",
            where: "beforeBegin"
          }
        },
        {
          name: "搜狗",
          url: /^https?:\/\/www\.sogou\.com\/(?:web|s)/,
          enabled: true,
          engineList: "web",
          fixedTop: 60,
          style: "                        top:-46px;                        z-index:99;                        margin-left:-5px;                ",
          style_ACBaidu: "                        top:-46px;                        z-index:99;                        margin-left:60px;                        padding-left: 0px !important;                ",
          insertIntoDoc: {
            keyword: "css;#upquery",
            target: "css;#wrapper",
            where: "afterBegin"
          },
          stylish: "#float_uphint{display:none;}"
        },
        {
          name: "yandex",
          url: /^https?:\/\/yandex\.(?:com|ru)\/search/i,
          engineList: "web",
          enabled: true,
          fixedTop: 96,
          class: "main__center",
          style: "                    padding-left:0px;                ",
          insertIntoDoc: {
            keyword: "css;.input__control",
            target: "css;.main",
            where: "beforeBegin"
          },
          stylish: ".main .main__center{padding-top:0px}"
        },
        {
          name: "google网页分类搜索",
          enabled: true,
          url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?:tbm=)(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$/,
          engineList: "web",
          style: "                    margin-left: 142px;                    z-index: 100;                    margin-top:5px;                ",
          insertIntoDoc: {
            target: "css;#appbar",
            keyword: '//input[@name="q"]',
            where: "beforeBegin"
          },
          stylish: "body.vasq #hdtbMenus.hdtb-td-o{top:100px !important}"
        },
        {
          name: "startpage",
          enabled: true,
          url: /^https?:\/\/(www\.)?startpage\.com\/[a-zA-Z]{2,3}\/search/,
          engineList: "web",
          fixedTop: 103,
          style: "                    z-index: 100;                ",
          insertIntoDoc: {
            target: "css;.layout-web__mainline",
            keyword: '//input[@name="query"]',
            // where: 'beforeBegin',
            where: "afterBegin"
          }
        },
        {
          name: "startpage2",
          enabled: true,
          url: /^https?:\/\/www\.startpage\.com\/do\/asearch/,
          engineList: "web",
          fixedTop: 102,
          fixedTopColor: "#202c46",
          nightMode: true,
          style: "                    z-index: 100;                    margin-left: 135px;                    color:#ccc;                ",
          insertIntoDoc: {
            target: "css;.layout-web__header",
            keyword: '//input[@name="query"]',
            // where: 'beforeBegin',
            where: "beforeEnd"
          },
          stylish: ".layout-web__body{margin-top:110px;}"
        },
        {
          name: "infinitynewtab",
          enabled: true,
          url: /^https?:\/\/google\.infinitynewtab\.com\/\?q/i,
          engineList: "web",
          style: "                    z-index: 100;                    margin-top: 20px;                ",
          insertIntoDoc: {
            target: "css;.search-types",
            // keyword: 'css;input.gsc-input',
            keyword: '//input[@name="search"]',
            where: "afterBegin"
          }
        },
        {
          name: "ecosia",
          enabled: true,
          url: /^https?:\/\/www\.ecosia\.org\/search\?/i,
          engineList: "web",
          style: "                    margin-left: -10px;                    margin-top: -20px;                    z-index:1;                    background-color:#fff;                ",
          insertIntoDoc: {
            target: "css;.mainline",
            keyword: '//input[@name="q"]',
            where: "afterBegin"
          }
        },
        {
          name: "f搜",
          enabled: true,
          url: /^https?:\/\/fsoufsou\.com\/search/,
          engineList: "web",
          fixedTop: 111,
          style: "                    margin-left: 50px;                    z-index: -99999;                    margin-top:5px;                ",
          style_ACBaidu: "                    text-align: center;                    z-index: -99999;                    margin-top:5px;                ",
          insertIntoDoc: {
            target: "css;.input-with-suggestion",
            keyword: function() {
              var input = document.getElementById("search-input");
              if (input) return input.value;
            },
            where: "beforeEnd"
          },
          stylish: ".tabs-bottom-border{transform: translate(0, 32px); !important}"
        },
        {
          name: "brave",
          enabled: true,
          // https://search.brave.com/search?q=0
          url: /^https?:\/\/search\.brave\.com\/search\?/i,
          engineList: "web",
          class: "container-80",
          style: "                    z-index:1;                ",
          insertIntoDoc: {
            target: "css;#search-main",
            keyword: '//input[@name="q"]',
            where: "beforeBegin"
          }
        },
        {
          name: "neeva",
          enabled: true,
          // https://neeva.com/search?q=0
          url: /^https?:\/\/neeva\.com\/search\?/i,
          engineList: "web",
          fixedTop: 80,
          style: "                    z-index:1;                ",
          insertIntoDoc: {
            target: "css;#search header",
            keyword: '//input[@name="q"]',
            where: "afterEnd"
          }
        },
        {
          name: "Kagi搜索",
          enabled: true,
          url: /^https?:\/\/kagi\.com\/search/,
          engineList: "web",
          style: "                    margin: 0;                    padding: 0;                    background: transparent;                    border: none;                    border-radius: 0;                    box-shadow: none;                    z-index: 100;                ",
          insertIntoDoc: {
            keyword: function() {
              var urlParams = new URLSearchParams(window.location.search);
              var query = urlParams.get("q");
              if (query) {
                return decodeURIComponent(query);
              }
              var searchInput = document.querySelector('input[name="q"]') || document.querySelector('input[type="search"]') || document.querySelector(".search-input");
              if (searchInput && searchInput.value) {
                return searchInput.value;
              }
              var title = document.title;
              var match = title.match(/^(.+?)\s*-\s*Kagi/);
              return match ? match[1] : "";
            },
            target: function() {
              var mainContent = document.querySelector("#main") || document.querySelector("main") || document.querySelector("._0_main-search-results") || document.querySelector(".center-content-box");
              return mainContent;
            },
            where: "afterBegin"
          },
          stylish: '                    /* Kagi原生风格适配 - 紧凑版本 */                    .sej-result {                        display: flex;                        flex-wrap: wrap;                        gap: 8px;                        margin: 0 0 12px 0;                        padding: 8px 0;                        border-bottom: 1px solid rgba(0,0,0,0.08);                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;                    }                                        .sej-result a {                        display: inline-flex;                        align-items: center;                        padding: 6px 12px;                        margin: 0;                        background: rgba(0,0,0,0.02);                        border: 1px solid rgba(0,0,0,0.08);                        border-radius: 6px;                        color: #0066cc !important;                        text-decoration: none;                        font-size: 13px;                        font-weight: 500;                        transition: all 0.15s ease;                        gap: 6px;                    }                                        .sej-result a:hover {                        background: rgba(0,102,204,0.08);                        border-color: rgba(0,102,204,0.2);                        transform: translateY(-1px);                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);                    }                                        .sej-result img {                        width: 14px;                        height: 14px;                        margin: 0;                        opacity: 0.8;                    }                                        /* 深色主题适配 */                    @media (prefers-color-scheme: dark) {                        .sej-result {                            border-bottom-color: rgba(255,255,255,0.1);                        }                                                .sej-result a {                            background: rgba(255,255,255,0.05);                            border-color: rgba(255,255,255,0.1);                            color: #4d9eff !important;                        }                                                .sej-result a:hover {                            background: rgba(77,158,255,0.15);                            border-color: rgba(77,158,255,0.3);                        }                    }                                        /* 确保在Kagi页面中正确显示 */                    [data-theme="dark"] .sej-result,                    .dark .sej-result {                        border-bottom-color: rgba(255,255,255,0.1);                    }                                        [data-theme="dark"] .sej-result a,                    .dark .sej-result a {                        background: rgba(255,255,255,0.05);                        border-color: rgba(255,255,255,0.1);                        color: #4d9eff !important;                    }                                        [data-theme="dark"] .sej-result a:hover,                    .dark .sej-result a:hover {                        background: rgba(77,158,255,0.15);                        border-color: rgba(77,158,255,0.3);                    }                                        /* 响应式设计 */                    @media (max-width: 768px) {                        .sej-result {                            padding: 6px 0;                            margin: 0 0 8px 0;                        }                                                .sej-result a {                            font-size: 12px;                            padding: 5px 10px;                        }                    }                '
        },
        // 知识
        {
          name: "百度百科词条",
          url: /^https?:\/\/baike\.baidu\.com\/item/,
          engineList: "knowledge",
          fixedTop: 65,
          enabled: true,
          style: "                    text-align: center;                    background: #fff;                ",
          insertIntoDoc: {
            keyword: "css;#query",
            target: "css;.navbar-wrapper",
            where: "beforeBegin"
          }
        },
        {
          name: "百度百科搜索",
          url: /^https?:\/\/baike\.baidu\.com\/search/,
          engineList: "knowledge",
          enabled: true,
          fixedTop: 56,
          style: "                    padding-left: 120px;                    margin: 5px 0 -10px 0px;                ",
          insertIntoDoc: {
            keyword: "css;#query",
            target: "css;.header-wrapper",
            where: "afterEnd"
          }
        },
        {
          name: "百度文库",
          url: /^https?:\/\/wenku\.baidu\.com\/search/i,
          engineList: "knowledge",
          enabled: true,
          fixedTop: 96,
          style: "                    margin-bottom: 6px;                    margin-top:-16px;                    padding:0;                ",
          insertIntoDoc: {
            keyword: function() {
              var str = document.querySelector("#kw").value;
              return str;
            },
            target: "css;.bd-wrap",
            where: "afterBegin"
          }
        },
        {
          name: "百度知道",
          url: /^https?:\/\/zhidao\.baidu\.com\/search/i,
          engineList: "knowledge",
          enabled: true,
          style: "                    border-top: 1px solid #e5e5e5;                    border-bottom: 1px solid #e5e5e5;                    margin-bottom: 1px;                    margin-left:112px;                ",
          insertIntoDoc: {
            keyword: "css;#kw",
            target: "css;#header",
            where: "afterEnd"
          }
        },
        {
          name: "维基百科",
          url: /^https?:\/\/\D{2,5}\.wikipedia\.org\/wiki/i,
          engineList: "knowledge",
          enabled: true,
          style: "                        position: absolute;                        padding-left: 14em;                ",
          insertIntoDoc: {
            keyword: function() {
              var url3 = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
              return decodeURIComponent(url3);
            },
            target: "css;#mw-head",
            where: "afterBegin"
          }
        },
        {
          name: "知乎",
          url: /^https?:\/\/www\.zhihu\.com\/search\?/i,
          engineList: "knowledge",
          enabled: true,
          fixedTop: 62,
          style: "                    margin: 5px auto 0px;                    width:960px;                    z-index:19;                    background: #fff;                    box-shadow: 0 1px 3px 0 rgba(0,34,77,.05);                      padding: 5px 20px;                 ",
          // 兼容“知乎排版优化”
          // https://greasyfork.org/zh-CN/scripts/21659
          style_ZhihuChenglinz: "                    margin: 5px auto 0px;                    width:654px;                    z-index:19;                    background: #fff;                    box-shadow: 0 1px 3px 0 rgba(0,34,77,.05);                      padding: 5px 20px;                 ",
          insertIntoDoc: {
            keyword: "css;.Input",
            target: "css;.App-main .SearchTabs",
            where: "afterEnd"
            //beforeBegin
          },
          stylish: ".TopSearch.Card{margin:30px auto;}"
        },
        {
          name: "互动百科搜索页",
          url: /^https?:\/\/so\.baike\.com\/doc/i,
          engineList: "knowledge",
          enabled: true,
          style: "                    border-top: 1px solid #e5e5e5;                    text-align: center;                    border-bottom: 1px solid #e5e5e5;                    margin-bottom: 1px;                ",
          insertIntoDoc: {
            keyword: "css;.ac_input",
            target: "css;.bk-head",
            where: "afterEnd"
          }
        },
        {
          name: "互动百科词条页",
          url: /^https?:\/\/www\.baike\.com\/wiki/i,
          engineList: "knowledge",
          enabled: true,
          style: "                    border-top: 1px solid #e5e5e5;                    text-align: center;                    border-bottom: 1px solid #e5e5e5;                    margin-bottom: 1px;                ",
          insertIntoDoc: {
            keyword: "css;.ac_input",
            target: "css;.bk-head",
            where: "afterEnd"
          }
        },
        {
          name: "豆丁文档",
          url: /^https?:\/\/www\.docin\.com\/search\.do/,
          engineList: "knowledge",
          enabled: true,
          style: "                    text-align: center;                    margin:0 auto;                    padding-top:1px;                    border-top:1px solid #00000;                    border-bottom:1px solid #D9E1F7;                ",
          insertIntoDoc: {
            keyword: "css;#topsearch",
            target: "css;.doc_hd_mini",
            where: "afterEnd"
          }
        },
        {
          name: "知乎(搜狗)",
          url: /^https?:\/\/zhihu\.sogou\.com\/zhihu/,
          enabled: true,
          engineList: "web",
          fixedTop: 55,
          style: "                      margin: auto;                      width: 1000px;                      z-index:99;                   ",
          insertIntoDoc: {
            keyword: "css;#upquery",
            target: "css;#header",
            where: "afterEnd"
          },
          stylish: ".header{ margin-bottom: 5px; }"
        },
        {
          name: "微信搜狗",
          url: /^https?:\/\/weixin\.sogou\.com\/weixin\?/,
          enabled: true,
          engineList: "web",
          fixedTop: 55,
          style: "width: 1000px;margin: 8px auto -5px;z-index:99;",
          insertIntoDoc: {
            keyword: "//input[@name='query']",
            target: "css;.header-box",
            where: "afterEnd"
          }
        },
        {
          name: "Quora",
          // https://www.quora.com/search?q=china
          url: /^https?:\/\/www\.quora\.com\/search\?/i,
          enabled: true,
          engineList: "knowledge",
          fixedTop: 53,
          style: "width: 1000px;margin: 0px auto 0px; padding-left:180px;",
          insertIntoDoc: {
            keyword: function() {
              var url3 = window.location.href.substring(window.location.href.lastIndexOf("=") + 1);
              return decodeURIComponent(url3);
            },
            target: "css;.SiteHeader",
            where: "beforeEnd"
          }
        },
        {
          name: "stackoverflow",
          url: /^https?:\/\/stackoverflow\.com\/search\?/i,
          enabled: true,
          engineList: "knowledge",
          fixedTop: 50,
          style: "width: 1000px;margin: 8px auto 0px;z-index:99;",
          insertIntoDoc: {
            keyword: "//input[@name='q']",
            target: "css;.top-bar",
            where: "afterEnd"
          }
        },
        // 视频网站
        {
          name: "优酷",
          url: /^https?:\/\/www\.soku\.com\/search_video\//,
          engineList: "video",
          enabled: true,
          fixedTop: 54,
          style: "                    width:1190px;                    margin:0 auto;                    z-index:99999;                ",
          insertIntoDoc: {
            keyword: "css;#headq",
            target: "css;.sk_container",
            where: "beforeBegin"
          }
        },
        {
          name: "土豆",
          url: /^https?:\/\/www\.soku\.com\/t\/nisearch\//,
          enabled: true,
          engineList: "video",
          style: "                    padding-left: 10px;                    border-top: 1px solid #FC6500;                    border-bottom: 1px solid #FC6500;                    text-align: center;                ",
          insertIntoDoc: {
            keyword: "css;#headq",
            target: "css;body > .sk_container",
            where: "beforeBegin"
          }
        },
        {
          name: "哔哩哔哩",
          url: /^https?:\/\/search\.bilibili\.com\/(all|video|bangumi|pgc|live|article|upuser)(?:\/|$|\?)/,
          enabled: true,
          engineList: "video",
          // fixedTop:62,
          style: "                    width:980px;                    margin:10px auto -5px;                    text-align:center;                ",
          insertIntoDoc: {
            // keyword: 'css;#search-keyword',   //旧
            // target: 'css;.filter-wrap',     //旧
            // keyword: 'css;.search-input-el',
            keyword: function() {
              if (document.querySelector("#search-keyword")) {
                return document.querySelector("#search-keyword").value;
              } else {
                return document.querySelector(".search-input-el").value;
              }
            },
            // target: 'css;.search-input',
            target: function() {
              if (document.querySelector(".head-contain")) {
                return document.querySelector(".head-contain");
              } else {
                return document.querySelector(".search-input");
              }
            },
            where: "afterEnd"
          }
        },
        {
          name: "AcFun",
          url: /^https?:\/\/www\.acfun\.cn\/search/,
          enabled: true,
          engineList: "video",
          fixedTop: 46,
          style: "                    width:980px;                    margin: -30px 0 10px 0;                    text-align:center;                ",
          insertIntoDoc: {
            keyword: "css;#search-text--standalone",
            target: "css;.search__main__container",
            where: "afterEnd"
          }
        },
        {
          name: "YouTube",
          url: /^https?:\/\/www\.youtube\.com(?:(?:\/(?!embed\/).*)|(?:[?#].*))?$/,
          enabled: true,
          engineList: "video",
          fixedTop: 56,
          style: "                    z-index:9;                    margin-top: 62px;                    margin-bottom: -80px;                    text-align: center;                    backgroud:#fff;                ",
          insertIntoDoc: {
            keyword: function() {
              var input = document.querySelector("input#search") || document.querySelector("form#search-form input") || document.querySelector("ytd-searchbox input") || document.querySelector("input#masthead-search-term") || document.querySelector('input[name="search_query"]');
              return input ? input.value : "";
            },
            target: "css;#page-manager",
            where: "beforeBegin"
          }
        },
        {
          name: "niconico",
          url: /^https?:\/\/www\.nicovideo\.jp\/search\//,
          enabled: true,
          engineList: "video",
          style: "                    border-top: 1px solid #E8E8E8;                    border-bottom: 1px solid #E8E8E8;                    text-align: center;                ",
          insertIntoDoc: {
            keyword: "css;#search_united",
            target: "css;.tagListBox",
            where: "beforeBegin"
          }
        },
        {
          name: "Iqiyi",
          url: /^https?:\/\/so\.iqiyi\.com\/so\/q/,
          enabled: true,
          engineList: "video",
          fixedTop: 60,
          style: "                        margin:0 auto;                        width:1180px;                        ",
          insertIntoDoc: {
            keyword: "css;#data-widget-searchword",
            target: "css;.mod_search_header",
            where: "afterEnd"
          }
        },
        {
          name: "腾讯视频",
          url: /^https?:\/\/v\.qq\.com\/x\/search/i,
          engineList: "video",
          enabled: true,
          fixedTop: 60,
          style: "width:1140px;margin:0 auto;",
          insertIntoDoc: {
            keyword: "css;#keywords",
            target: "css;.site_head_simple",
            where: "afterEnd"
          }
        },
        {
          name: "樱花动漫",
          url: /^https?:\/\/www\.imomoe\.ai\/search/,
          engineList: "video",
          enabled: true,
          style: "                     width:1140px;                    margin:-10px auto 10px;,                    ",
          insertIntoDoc: {
            keyword: '//input[@name="searchword"]',
            target: "css;.head",
            where: "afterEnd"
          }
        },
        // 音乐
        {
          name: "百度音乐",
          url: /^https?:\/\/music\.baidu\.com\/search/,
          enabled: true,
          engineList: "music",
          style: "                    border-top: 0px solid #0064C4;                    margin-bottom: 5px;                ",
          insertIntoDoc: {
            keyword: "css;#ww",
            target: "css;.nav-wrapper",
            where: "beforeBegin"
          }
        },
        {
          name: "一听音乐",
          url: /^https?:\/\/so\.1ting\.com\/all\.do/,
          enabled: true,
          engineList: "music",
          style: "                    text-align: center;                    border-bottom: 1px solid #13B310;                    border-top: 1px solid #13B310;                ",
          insertIntoDoc: {
            keyword: "css;#keyword",
            target: "css;.nav",
            where: "beforeBegin"
          }
        },
        {
          name: "xiami",
          url: /^https?:\/\/www\.xiami\.com\/search/,
          enabled: true,
          engineList: "music",
          style: "                    border-top: 1px solid #93D3FF;                    text-align: center;                ",
          insertIntoDoc: {
            keyword: "css;#search_text",
            target: "css;.search_result",
            where: "beforeBegin"
          }
        },
        {
          name: "QQ音乐",
          url: /^https?:\/\/s\.music\.qq\.com/i,
          enabled: true,
          engineList: "music",
          style: "                    border-bottom: 1px solid #2B6DAE;                    border-top: 1px solid #2B6DAE;                    text-align: center;                ",
          insertIntoDoc: {
            keyword: "css;#keyword",
            target: "css;.mod_soso",
            where: "afterEnd"
          }
        },
        {
          name: "网易云音乐",
          url: /^https?:\/\/music\.163\.com\/.*?#\/search/i,
          enabled: true,
          engineList: "music",
          fixedTop: 80,
          style: "                    text-align: center;                    padding-top:8px;                    ",
          insertIntoDoc: {
            keyword: (function() {
              return decodeURI(document.URL.match(/s=(.+?)(&|$)/)[1]);
            }),
            target: "css;.m-subnav.m-subnav-up.f-pr.j-tflag",
            where: "afterEnd"
          }
        },
        {
          name: "音悦台",
          url: /^https?:\/\/so\.yinyuetai\.com\/\?keyword/,
          enabled: true,
          engineList: "music",
          style: "                    border-bottom: 1px solid #2B6DAE;                    border-top: 1px solid #2B6DAE;                    text-align: center;                    ",
          insertIntoDoc: {
            keyword: function() {
              var url3 = window.location.href.substring(window.location.href.lastIndexOf("=") + 1);
              return decodeURIComponent(url3);
            },
            target: "css;.content",
            where: "afterEnd"
          }
        },
        // 图片
        {
          name: "百度图片",
          url: /^https?:\/\/image\.baidu\.com\/search/i,
          enabled: true,
          engineList: "image",
          fixedTop: 70,
          //关闭关联联想的情况下
          // fixedTop:135,  //
          style: "                    margin-left:127px;                    ",
          insertIntoDoc: {
            keyword: "css;input#kw",
            target: "css;.s_tab",
            where: "afterEnd"
          }
        },
        {
          name: "谷歌图片",
          url: /^https?:\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/[^?]+\?.*&tbm=isch/i,
          enabled: true,
          engineList: "image",
          fixedTop: 52,
          style: "                    margin-left:136px;                    padding: 10px 5px 1px 22px;                    ",
          insertIntoDoc: {
            keyword: "css;input[name=q]",
            // target: 'css;#ucs',
            target: "css;.ndYZfc",
            where: "afterBegin"
            // where: 'beforeEnd',
          }
        },
        {
          name: "必应图片",
          url: /^https?:\/\/.*\.bing\.com\/images\/search/i,
          enabled: true,
          engineList: "image",
          style: "                    padding-left:90px;                    margin-top:-6px;                    ",
          insertIntoDoc: {
            keyword: "css;#sb_form_q",
            target: "css;#rfPaneIn",
            where: "afterBegin"
          }
        },
        {
          name: "flickr",
          url: /^https?:\/\/www\.flickr\.com\/search\//,
          engineList: "image",
          enabled: true,
          style: "                    z-index:1999;                    width:100%;                    border-top:1px solid #EBF1FF;                    border-bottom:0px solid #EBF1FF;                    ",
          insertIntoDoc: {
            keyword: function() {
              var input = document.getElementById("autosuggest-input");
              if (input) {
                return input.value;
              } else {
                var m = location.search.match(/q=([^&]+)/i);
                if (m) {
                  return decodeURIComponent(m[1]);
                }
              }
            },
            target: "css;.using-slender-advanced-panel",
            where: "afterBegin"
          }
        },
        {
          name: "pixiv",
          url: /^http:\/\/www\.pixiv\.net\/search\.php/i,
          engineList: "image",
          enabled: true,
          style: "                    margin: 0 auto;                    text-align: center;                    font-family: 微软雅黑;                   ",
          insertIntoDoc: {
            keyword: "css;input[name=word]",
            target: "css;body",
            where: "beforeBegin"
          }
        },
        {
          name: "花瓣",
          url: /^https?:\/\/huaban\.com\/search\/\?/,
          engineList: "image",
          enabled: true,
          style: "                    border-top:1px solid #EBF1FF;                    text-align: center;                    ",
          insertIntoDoc: {
            keyword: "css;#query",
            target: "css;#search_switch",
            where: "afterEnd"
          }
        },
        {
          name: "Pinterest",
          url: /^https?:\/\/www\.pinterest\.com\/search\//,
          engineList: "image",
          enabled: true,
          style: "                    text-align: center;                    margin-top:-11px;                    ",
          insertIntoDoc: {
            keyword: '//input[@name="q"]',
            target: "css;.headerContainer",
            where: "afterEnd"
          }
        },
        // 资源下载
        {
          name: "海盗湾thepiratebay",
          url: /^https?:\/\/thepiratebay\.org\/search/i,
          engineList: "bittorrent",
          enabled: true,
          style: "                    text-align: center;                    z-index: 9999;                    ",
          insertIntoDoc: {
            keyword: "css;.inputbox",
            target: "css;#SearchResults",
            where: "beforeBegin"
          }
        },
        {
          name: "动漫花园",
          url: /^https?:\/\/share\.dmhy\.org\/topics\/list\?keyword\=/i,
          engineList: "download",
          enabled: true,
          style: "                    text-align: center;                    ",
          insertIntoDoc: {
            keyword: "css;#keyword",
            target: "css;.table.clear",
            where: "beforeBegin"
          }
        },
        {
          name: "ED2K",
          url: /^https?:\/\/www\.ed2000\.com\/filelist\.asp/i,
          engineList: "download",
          enabled: true,
          insertIntoDoc: {
            keyword: "css;.searchtxt",
            target: "css;.topsearch",
            where: "afterEnd"
          }
        },
        {
          name: "人人影视",
          url: /^https?:\/\/www\.zimuzu\.tv\/search\//,
          engineList: "download",
          enabled: true,
          style: "                    border-bottom: 1px solid #00AFFF;                    text-align: center;                    ",
          insertIntoDoc: {
            keyword: '//input[@name="q"]',
            target: "css;.Header",
            where: "afterEnd"
          }
        },
        {
          name: "subHD字幕",
          url: /^https?:\/\/subhd\.com\/search/i,
          engineList: "download",
          enabled: true,
          style: "                    border-bottom: 0px solid #CAD9EA;                    border-top: 0px solid #CAD9EA;                    text-align: center;                    top: -20px;                ",
          insertIntoDoc: {
            keyword: "css;#sn",
            target: "css;.navbar.navbar-inverse",
            where: "afterEnd"
          }
        },
        //翻译词典
        {
          name: "谷歌翻译",
          url: /^https?:\/\/translate\.google(?:\.\D{1,4}){1,2}/i,
          enabled: true,
          engineList: "translate",
          style: "                    margin:10px 0px 0px 0px;                ",
          insertIntoDoc: {
            keyword: "css;.D5aOJc ",
            target: "css;.MOkH4e ",
            where: "afterBegin"
          }
        },
        {
          name: "百度翻译",
          url: /^https?:\/\/fanyi\.baidu\.com/i,
          enabled: true,
          engineList: "translate",
          style: "                    margin: -20px 0 10px 0;                ",
          insertIntoDoc: {
            keyword: function() {
              return document.querySelector("#baidu_translate_input").value;
            },
            target: "css;.inner",
            where: "afterBegin"
          }
        },
        {
          name: "必应词典",
          url: /^https?:\/\/.*\.bing\.com\/dict\/search\?q\=/i,
          enabled: true,
          engineList: "translate",
          style: "                    padding-left:15px;                    margin-top:6px;                    margin-left: 148px;                ",
          insertIntoDoc: {
            keyword: "css;#sb_form_q",
            target: "css;#b_header",
            where: "beforeEnd"
          }
        },
        {
          name: "有道翻译",
          url: /^https?:\/\/dict\.youdao\.com\/search/i,
          enabled: true,
          engineList: "translate",
          fixedTop: 64,
          style: "                    padding-left:0px;                    margin-top:2px;                    text-align:center;                ",
          insertIntoDoc: {
            keyword: "css;#query",
            target: "css;.c-topbar-wrapper",
            where: "beforeEnd"
          }
        },
        {
          name: "有道翻译2",
          url: /^https?:\/\/dict\.youdao\.com\/w/i,
          enabled: true,
          engineList: "translate",
          fixedTop: 64,
          style: "                    padding-left:0px;                    margin-top:2px;                    text-align:center;                ",
          insertIntoDoc: {
            keyword: "css;#query",
            target: "css;.c-topbar-wrapper",
            where: "beforeEnd"
          }
        },
        {
          name: "海词",
          url: /^https?:\/\/dict\.cn\/./,
          enabled: true,
          engineList: "translate",
          style: "                    z-index : 99;                    margin : -30px auto 0;                    position : absolute;                    width : 100%;                    text-align : center;                   ",
          insertIntoDoc: {
            keyword: "css;#q",
            target: "css;.top",
            where: "afterEnd"
          }
        },
        {
          name: "金山词霸",
          //    https://www.iciba.com/word?w=test
          url: /^https?:\/\/www\.iciba\.com\/word/i,
          enabled: true,
          engineList: "translate",
          fixedTop: 122,
          style: "                    z-index : 0;                ",
          insertIntoDoc: {
            keyword: '//input[@type="search"]',
            target: "css;.Search_input__1qgiU",
            where: "afterEnd"
          }
        },
        // 购物
        {
          name: "淘宝搜索",
          url: /^https?:\/\/s\.taobao\.com\/search/,
          enabled: true,
          engineList: "shopping",
          style: "                    margin:0px 0 -10px 170px;                    text-align: center;                    z-index: 99;                ",
          insertIntoDoc: {
            keyword: function() {
              var input = document.querySelector("#q");
              if (input) {
                return input.value;
              } else {
                var m = location.search.match(/q=([^&]+)/);
                if (m) {
                  return decodeURIComponent(m[1]);
                }
              }
            },
            target: "css;.header-wraper",
            where: "afterEnd"
          }
        },
        {
          name: "天猫超市搜索",
          url: /^https?:\/\/list\.tmall\.com\/search_product\.htm.*from=chaoshi/i,
          enabled: true,
          engineList: "shopping",
          fixedTop: 37,
          style: "                    z-index:9999;                    margin: 2px auto -10px;                    left:0;                    right:0;                    text-align:center;                    position:absolute;                ",
          insertIntoDoc: {
            keyword: "css;#mq",
            target: "css;.headerCon",
            where: "beforeBegin"
          }
        },
        {
          name: "天猫搜索",
          url: /^https?:\/\/list\.tmall\.com\/search_product\.htm/i,
          enabled: true,
          engineList: "shopping",
          fixedTop: 34,
          style: "                    margin: 10px auto -10px;                    text-align:center;                ",
          insertIntoDoc: {
            keyword: "css;#mq",
            target: "css;.headerCon",
            where: "beforeBegin"
          }
        },
        {
          name: "京东",
          url: /^https?:\/\/search\.jd\.com\/Search/,
          enabled: true,
          engineList: "shopping",
          style: "                    text-align:center;                     margin-top: 5px;                     margin-bottom: -20px;                     ",
          insertIntoDoc: {
            keyword: "css;#key",
            target: "css;#o-header-2013",
            where: "afterEnd"
          }
        },
        {
          name: "苏宁",
          url: /^https?:\/\/search\.suning\.com/i,
          enabled: true,
          engineList: "shopping",
          style: "                    border-bottom: 1px solid #E5E5E5;                    border-top: 1px solid #E5E5E5;                    text-align: center;                ",
          insertIntoDoc: {
            keyword: "css;#searchKeywordsHidden",
            target: "css;.ng-toolbar",
            where: "afterEnd"
          }
        },
        {
          name: "1号店",
          url: /^https?:\/\/search\.yhd\.com\/c0-0\/k/i,
          enabled: true,
          engineList: "shopping",
          style: "                    border-bottom: 1px solid #E5E5E5;                    border-top: 1px solid #E5E5E5;                    text-align: center;                ",
          insertIntoDoc: {
            keyword: "css;#keyword",
            target: "css;#global_top_bar",
            where: "afterEnd"
          }
        },
        {
          name: "什么值得买",
          // http://search.smzdm.com/?c=home&s=%E8%A5%BF%E6%B8%B8%E8%AE%B0
          url: /^https?:\/\/search\.smzdm\.com\/\?/i,
          enabled: true,
          engineList: "shopping",
          fixedTop: 40,
          style: "                    text-align: center;                    margin: -15px 0 10px 0;                ",
          insertIntoDoc: {
            keyword: "css;#J_search_input",
            target: "css;.search-inner",
            where: "afterEnd"
          }
        },
        {
          name: "亚马逊",
          // https://www.amazon.cn/s?k=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91
          url: /^https?:\/\/www\.amazon\.cn\/s\?k/i,
          enabled: true,
          engineList: "shopping",
          style: "                 margin:2px 0 -10px 0;             ",
          insertIntoDoc: {
            keyword: "css;#twotabsearchtextbox",
            target: "css;.sg-row",
            where: "afterBegin"
          }
        },
        {
          name: "1688",
          // https://s.1688.com/selloffer/offer_search.htm?keywords=%
          url: /^https?:\/\/s\.1688\.com\/selloffer\/offer_search/i,
          enabled: true,
          engineList: "shopping",
          fixedTop: 88,
          class: "tab-container",
          style: "                 margin:-10px auto 5px;             ",
          insertIntoDoc: {
            keyword: '//input[@name="keywords"]',
            target: "css;.header-container",
            where: "afterEnd"
          }
        },
        {
          name: "慢慢买",
          // http://ss.manmanbuy.com/Default.aspx?key=%s
          url: /^https?:\/\/ss\.manmanbuy\.com\/Default\.aspx\?key/i,
          enabled: true,
          engineList: "shopping",
          style: "                 text-align:center;             ",
          insertIntoDoc: {
            keyword: '//input[@name="key"]',
            target: "css;#resultcomment",
            where: "beforeBegin"
          }
        },
        //社交
        {
          name: "新浪微博",
          url: /^https?:\/\/s\.weibo\.com\/weibo\//i,
          enabled: true,
          engineList: "sociality",
          fixedTop: 48,
          style: "                    // border-bottom: 1px solid #E5E5E5;                    // border-top: 1px solid #E5E5E5;                    // text-align: center;                ",
          insertIntoDoc: {
            keyword: "css;.searchInp_form",
            target: "css;#pl_common_searchTop",
            where: "afterEnd"
          }
        },
        {
          name: "百度贴吧",
          url: /^https?:\/\/tieba\.baidu\.com\/f\/search/i,
          enabled: true,
          engineList: "sociality",
          style: "                    border-top: 1px solid #e5e5e5;                    text-align: center;                    border-bottom: 1px solid #e5e5e5;                    margin-bottom: 1px;                ",
          insertIntoDoc: {
            keyword: "css;#wd1",
            target: "css;.s_container.clearfix",
            where: "beforeBegin"
          }
        },
        {
          name: "豆瓣1",
          url: /^https?:\/\/(movie|music|book)\.douban\.com\/subject_search?/,
          enabled: true,
          engineList: "sociality",
          style: "                    border-top: 1px solid #e5e5e5;                    text-align: center;                    border-bottom: 1px solid #e5e5e5;                    margin-bottom: 1px;                ",
          insertIntoDoc: {
            keyword: "css;#inp-query",
            target: "css;.nav-secondary",
            where: "afterEnd"
          }
        },
        {
          name: "豆瓣2",
          url: /^https?:\/\/www\.douban\.com\/search/i,
          enabled: true,
          engineList: "sociality",
          style: "                    border-top: 1px solid #e5e5e5;                    text-align: center;                    border-bottom: 1px solid #e5e5e5;                    margin-bottom: 1px;                ",
          insertIntoDoc: {
            keyword: "css;#inp",
            target: "css;#db-global-nav",
            where: "afterEnd"
          }
        },
        //学术搜索列表
        {
          name: "百度学术",
          url: /^https?:\/\/xueshu\.baidu\.com\/(?:s|baidu)/,
          enabled: true,
          engineList: "scholar",
          style: "                    text-align: center;                    margin:0px;                    top:0px;                    z-index:99999;                    ",
          insertIntoDoc: {
            keyword: "css;input#kw",
            target: "css;#head_wr",
            where: "afterEnd"
          }
        },
        {
          name: "谷歌学术",
          enabled: true,
          url: /^https?:\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/,
          engineList: "scholar",
          style: "                    z-index:999;                    position:relative;                ",
          insertIntoDoc: {
            target: "css;#gs_ab",
            keyword: '//input[@name="q"]',
            where: "beforeBegin"
          }
        },
        {
          name: "cnki",
          url: /^http:\/\/search\.cnki\.net\/search\.aspx/i,
          enabled: true,
          engineList: "scholar",
          style: "                    padding-left:15px;                    border-top:1px solid #D9E1F7;                    border-bottom:1px solid #D9E1F7;                    margin-top:-1px;                    ",
          insertIntoDoc: {
            keyword: "css;#txtSearchKey",
            target: "css;.main",
            where: "afterBegin"
          }
        },
        {
          name: "知网",
          enabled: true,
          url: /^http:\/\/epub\.cnki\.net\/kns\/brief\/default_result\.aspx/i,
          engineList: "scholar",
          style: "                    border-bottom:1px solid #E5E5E5;                    border-top:1px solid #E5E5E5;                    z-index:999;                    position:relative;                    ",
          insertIntoDoc: {
            keyword: "css;#txt_1_value1",
            target: "css;#TopSearchBar",
            where: "afterEnd"
          }
        },
        {
          name: "万方",
          enabled: true,
          url: /^https?:\/\/s\.g\.wanfangdata\.com\.cn\/Paper\.aspx/i,
          engineList: "scholar",
          style: "                    border-bottom:1px solid #E5E5E5;                    border-top:1px solid #E5E5E5;                    z-index:999;                    position:relative;                    ",
          insertIntoDoc: {
            keyword: "css;#queryBox",
            target: "css;#content",
            where: "beforeBegin"
          }
        },
        {
          name: "EBSCO",
          enabled: true,
          url: /^http:\/\/.*?ebscohost\.com\/.*?results/i,
          engineList: "scholar",
          style: "                    border-bottom:1px solid #E5E5E5;                    border-top:1px solid #E5E5E5;                    position:relative;                    ",
          insertIntoDoc: {
            keyword: "css;#SearchTerm1",
            target: "css;#findFieldOuter",
            where: "afterend"
          }
        },
        {
          name: "Springer",
          enabled: true,
          url: /^http:\/\/link\.springer\.com\/search\?query=/i,
          engineList: "scholar",
          style: "                    border-bottom:1px solid #E5E5E5;                    border-top:1px solid #E5E5E5;                    position:relative;                    ",
          insertIntoDoc: {
            keyword: "css;#query",
            target: "css;#content",
            where: "beforeBegin"
          }
        },
        {
          name: "JSTOR",
          enabled: true,
          url: /^https?:.*?jstor.org\/action\/doAdvancedSearch/i,
          engineList: "scholar",
          style: "                    border-bottom:1px solid #E5E5E5;                    border-top:1px solid #E5E5E5;                    position:relative;                   ",
          insertIntoDoc: {
            keyword: "css;#searchBox",
            target: "css;.tabs-search-results",
            where: "beforeBegin"
          }
        },
        //html 列表
        {
          name: "w3c",
          enabled: true,
          url: /^https?:.*?runoob\.com\//i,
          engineList: "mine",
          style: "                    border-bottom:1px solid #E5E5E5;                    border-top:1px solid #E5E5E5;                    position:relative;                    text-align:center;                   ",
          insertIntoDoc: {
            keyword: function() {
              var url3 = window.location.href.substring(window.location.href.lastIndexOf("=") + 1);
              return decodeURIComponent(url3);
            },
            target: "css;.navigation",
            where: "afterEnd"
          }
        },
        {
          name: "GitHub",
          enabled: true,
          url: /^https?:\/\/github\.com\/search/,
          engineList: "mine",
          style: "                    position:relative;                    text-align:center;                   ",
          insertIntoDoc: {
            keyword: '//input[@name="q"]',
            target: "css;.Header",
            where: "afterEnd"
          }
        },
        {
          name: "MDN",
          enabled: true,
          url: /^https?:\/\/developer\.mozilla\.org\/.{2,5}\/search/,
          engineList: "mine",
          style: "                    position:relative;                    text-align:center;                   ",
          insertIntoDoc: {
            keyword: function() {
              var url3 = window.location.href.substring(window.location.href.lastIndexOf("=") + 1);
              return decodeURIComponent(url3);
            },
            target: "css;.results-search-form",
            where: "afterEnd"
          }
        },
        // 其他补充， 这个脚本将会朝重型方向发展，如果嫌弃代码过多，可自行删减无用代码
        {
          name: "infinitynewtab",
          enabled: true,
          //https://google.infinitynewtab.com/?q=苹果
          url: /^https?:\/\/google\.infinitynewtab\.com\/\?q/,
          engineList: "web",
          style: "                    text-align:center;                    position:fixed;                    z-index:99999;                    top:0;                   ",
          insertIntoDoc: {
            target: "css;.searchbox-results",
            // keyword: '//input[@name="search"]',
            keyword: "css;input.gsc-input",
            where: "beforeBegin"
          }
        },
        {
          name: "头条搜索",
          //https://so.toutiao.com/search
          url: /^https?:\/\/so\.toutiao\.com\/search/,
          engineList: "web",
          enabled: true,
          fixedTop: 75,
          style: "                    margin-left:146px;                    z-index:99999;                   ",
          insertIntoDoc: {
            target: "css;.result-content",
            // keyword: '//input[@name="search"]',
            keyword: '//input[@type="search"]',
            where: "beforeEnd"
          }
        },
        {
          name: "抖音搜索",
          url: /^https?:\/\/www\.douyin\.com\/search/,
          engineList: "web",
          enabled: true,
          fixedTop: 128,
          fixedTopColor: "rgb(22 23 34)",
          style: `
                    position:fixed;
                    z-index:99999;
                    margin-right:280px;
                   `,
          insertIntoDoc: {
            target: "css;.FtarROQM",
            // keyword: '//input[@name="search"]',
            keyword: function() {
              var input = document.querySelector('input[type="text"]');
              if (input) return input.value;
            },
            where: "afterBegin"
          },
          stylish: `.J122YuOM{padding-top:14px}
                    body {
                        --font-color-qxin:#ccc;
                        --background-color-qxin: #161722;
                        --background-avtive-color-qxin: #424242;
                        --background-active-enable-qxin:#274144;
                        --background-active-disable-qxin:#583535;
                        --background-hover-color-qxin: #424242;
                        --trigger-shown-qxin: #424242 !important;
                        --sej-drop-list-background-qxin:#121212;
                        --background-btn-qxin:#292f36;
                        --background-setting-qxin: #161722;
                    }
                    .OZ_3F0lc{
                        margin-top:10px;
                    }
                    `
        },
        //  用户补充: kidzgy
        //  https://greasyfork.org/zh-CN/scripts/27752/discussions/90497
        {
          name: "企查查",
          url: /^https?:\/\/www\.qcc\.com\/(?:web|firm|)/,
          engineList: "enterprise",
          enabled: true,
          fixedTop: 56,
          style: "                    width:1250px;                    margin: 0 auto;                    padding-left: 15px;                ",
          insertIntoDoc: {
            keyword: "css;#searchKey",
            target: "css;.app-nheader",
            where: "AfterEnd"
          },
          stylish: " .bigsearch-nav.fixed > .nav-wrap { position: static !important; }"
        },
        {
          name: "天眼查",
          url: /^https?:\/\/www\.tianyancha\.com\/(?:search|company)/,
          engineList: "enterprise",
          enabled: true,
          fixedTop: 73,
          style: "                    top:80px;                    margin: 0 auto;                    width:1248px;                ",
          insertIntoDoc: {
            keyword: "css;#header-company-search",
            target: "css;.tyc-header",
            where: "AfterEnd"
          },
          stylish: "#web-content.mt122{margin-top:90px !important} .search-bar{position:static !important}"
        },
        // 回家没网,用8090端口离线测试使用。
        {
          name: "test",
          enabled: true,
          url: /^https?:\/\/127\.0\.0\.1:8090\/./,
          style: "                    margin:150px;                ",
          insertIntoDoc: {
            keyword: function() {
              return false;
            },
            target: "css;body",
            where: "beforeEnd"
          }
        }
      ];
      var icon = {};
      icon = {
        google: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 15.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='48px' height='48px' viewBox='0 0 48 48' enable-background='new 0 0 48 48' xml:space='preserve'%3E%3Cpath fill='%23FFC107' d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'/%3E%3Cpath fill='%23FF3D00' d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'/%3E%3Cpath fill='%234CAF50' d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'/%3E%3Cpath fill='%231976D2' d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'/%3E%3C/svg%3E%0A",
        baidu: "data:image/svg+xml,%3Csvg t='1666880462710' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='36406' width='32' height='32'%3E%3Cpath d='M226.522 536.053c96.993-20.839 83.792-136.761 80.878-162.089-4.758-39.065-50.691-107.346-113.075-101.952-78.499 7.036-89.957 120.445-89.957 120.445C93.748 444.857 129.764 556.857 226.522 536.053zM329.512 737.61c-2.848 8.175-9.18 29.014-3.686 47.173 10.822 40.707 46.168 42.55 46.168 42.55l50.792 0L422.786 703.169 368.41 703.169C343.952 710.473 332.159 729.468 329.512 737.61zM406.537 341.666c53.572 0 96.859-61.646 96.859-137.9 0-76.12-43.287-137.767-96.859-137.767-53.472 0-96.892 61.646-96.892 137.767C309.645 280.019 353.065 341.666 406.537 341.666zM637.241 350.779c71.598 9.281 117.632-67.141 126.777-125.035 9.349-57.827-36.854-125.036-87.544-136.561-50.791-11.659-114.213 69.688-119.976 122.757C549.597 276.803 565.779 341.566 637.241 350.779zM812.666 691.174c0 0-110.761-85.701-175.425-178.305-87.645-136.593-212.177-81.011-253.822-11.558-41.478 69.452-106.106 113.375-115.286 125-9.314 11.458-133.813 78.666-106.173 201.423 27.64 122.69 124.7 120.345 124.7 120.345s71.53 7.036 154.519-11.524c83.021-18.428 154.484 4.59 154.484 4.59s193.919 64.929 246.988-60.072C895.655 756.037 812.666 691.174 812.666 691.174zM480.881 877.253 354.807 877.253c-54.443-10.855-76.12-48.044-78.867-54.343-2.68-6.433-18.125-36.317-9.951-87.109 23.52-76.12 90.627-81.614 90.627-81.614l67.107 0 0-82.485 57.157 0.871L480.88 877.253zM715.674 876.382l-145.07 0c-56.219-14.508-58.866-54.444-58.866-54.444L511.738 661.49l58.866-0.938 0 144.199c3.586 15.345 22.682 18.159 22.682 18.159l59.771 0L653.057 661.49l62.618 0L715.675 876.382zM921.051 448.006c0-27.708-23.018-111.13-108.385-111.13-85.501 0-96.925 78.732-96.925 134.382 0 53.136 4.489 127.313 110.695 124.935C932.677 593.846 921.051 475.881 921.051 448.006z' p-id='36407' fill='%23008bdd'%3E%3C/path%3E%3C/svg%3E",
        bing: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB5ElEQVQ4jZ2Tv0sbYRyHX5Uzl8bLVNrSToUOHbr0T2gHqf1Baf8AvcUruNcpd5e75BK9H0Q9gptCogZKh6J2kWtDhkpxkmCwOIidijpYECoI5unQNo0QauwHnuUD78PL9/2+on9w0ItrWiSraiSNjER9w8NRTFUjuQvimhaJuKZ9ThaLJHyfGzMz3AxDRC6H7LooQYDi+50JApJhiJBVNVJ8nx7TZKhU4svhIYX1dW4XCsRsm4FstjOOg+K6fwXCMHiysMCfvKhUELp+OcHjcrkleL60hEil/l/wslKhxzAQuk6vaRLPZC5/g9dra5jVKvdnZ5FtG5FKIVkWSjeCB3NzvFpeBuD7yQnvd3YYW13lztQUsm1fLHhUKnE1n6e+v0973mxtIaXTJDKZLoY4Ps71yUneNhqt/uPuLrJlceUiwcP5ea5NTJCt1fh2fNzq321vI6XT/xacNZuUNzdpHBy0Dp41m1Tqde4Vi/RbVucZPG1bpPbU9vZ4triIlE7TZ5qdXyFmWdzyfYobG/w4PQXg69ERYysrKI6D0PXzu9Am+KAEAYrjELNthGEwVC5jVqvcDUOErv/6E45znlwOxfMQ8ujop2QYorguiueRcF16HQeRzSLl8wz87hXXPY/nkZye5icfi28JEi0cegAAAABJRU5ErkJggg==",
        edit: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAACDklEQVR4nJXVzUtUURjH8Y/mSNKkki2iwiApxHQ1q/6C+gusoCB6oxbRRqFNL4sWtRKqhVSLIDe1CqpNiwjKIilKLKKFEr2Z2qI0xxHN0+LOm+PMOPOc1T2H7/f5ncO991BdNer30zmxKrl0xV2zKJjRoy6aqkkvbbdVLPuUq+8+5uGXnVILki7qsxgtNDtrTNLcijHvrdYsft0/wQ8DZgSzeqMUDW4IJceYHcvwCd1ies0KZvWI1TnhIH6574Olgg0E74zmhZ902j304by4Cxp5LPjtQNmjy3XPVK2rgmCBCcGgdVXhdBgUBCMEwVMNVeIvBMFLifKC8vgrndFBlRJUhJcWFMd3ZfGuzFRxwWrdu3KTxQQVhi8lqApfKVhf0d4bc2/OckG9Pkur7r3TEw+1FRO0GxdM2Vc2/HHBgr1If935UTfigbt5+C27MeSo9+m5GJYitlCwWR2G8oQZ/FgWX1aFgnZMG852v5nFR4rhMn+2dDVJYFpKqy0SDksUhF9FsE0bWgyIa9bIanihoEUcDTrSz4ueOVMOLxQkzVkrZcaoNz755rmpcnihYNghm3w26Ys/5cGcIKgRBJDyqCIquj8C1PqKZvHK+qVrJ5bMRwmGterU64pkkZupWO3RjXkzUZj9+jVZMGK6IsEaHTbgjpOSUYZL/pa5m4qPIbtyznpHvJaqGB53O33h4T/3VzLuzDhE6AAAAABJRU5ErkJggg==",
        del: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAADAFBMVEUAAADsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVH///9VVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fX19gYGBhYWFiYmJjY2NkZGRlZWVmZmZnZ2doaGhpaWlqampra2tsbGxtbW1ubm5vb29wcHBxcXFycnJzc3N0dHR1dXV2dnZ3d3d4eHh5eXl6enp7e3t8fHx9fX1+fn5/f3+AgICBgYGCgoKDg4OEhISFhYWGhoaHh4eIiIiJiYmKioqLi4uMjIyNjY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSVlZWWlpaXl5eYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7///8dej9TAAAAU3RSTlMAAABm7P/sZgAAABPO////zhQAAB/i/////////+IfAAAe4fvk4AAAAAAd/+Q3GxwAFR85FQBjz+LPY+v////r6//////rZM/h4c9jABUdHRUAAP0EcPoAAAEuSURBVHic7ZRnc8IwDIbdEUZHGB0kDsMOMcOMttBBB93Qvcj//y9VjB0Czh13/dz3ixT5OVmSYyMktLK6tm74oYxEMpVGUW1sbm2bM8DMZHP5OWBnd2+/YNnYAWHbKhRL5cocQKjrWFWPuSDmVS3HpUQu1eoNQkiTM9xqd7oHoG6n3cKMNyHcqNfQ4VGPUsr7nh0FbK/PIdw7PkGnZwOZNrqF9AfnF+jyaigLixYp/eH1Dbq9u4eAHyOAHh5HaPz0DCnjANjm5fUNvX98QoGCxyo5Fjmh0K/vH2hzAi0KnqnymMgJrU6gzemQBM+DZpX1/XBYUyAYTTAuZTUg+Aw8Zf+BvwJLR730sPTjXgD0H2YB0BUClXKpGAeE1y+fy2ZMfX12gdOpZMLQAfkE/AL7e5vGZF+dOQAAAABJRU5ErkJggg==",
        web: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjE1Nzg3MjgxNjcxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMyMjMiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTk0OC4wMzIgOTAyLjc4NGwtMjA2Ljk3Ni0yMDYuOTc2Qzc5Ny42OTYgNjI4LjkyOCA4MzIgNTQyLjUyOCA4MzIgNDQ4YzAtMjEyLjA2NC0xNzEuOTM2LTM4NC0zODQtMzg0UzY0IDIzNS45MzYgNjQgNDQ4czE3MS45MzYgMzg0IDM4NCAzODRjOTQuNTI4IDAgMTgwLjkyOC0zNC4zMDQgMjQ3LjgwOC05MC45MTJsMjA2Ljk3NiAyMDYuOTc2YzE0LjAxNiAxNC4wMTYgMzUuNDg4IDE1LjIzMiA0OCAyLjcyQzk2My4yNjQgOTM4LjI3MiA5NjIuMDQ4IDkxNi44IDk0OC4wMzIgOTAyLjc4NHpNNDQ4IDc2OEMyNzEuMjY0IDc2OCAxMjggNjI0LjczNiAxMjggNDQ4UzI3MS4yNjQgMTI4IDQ0OCAxMjhzMzIwIDE0My4yNjQgMzIwIDMyMFM2MjQuNzM2IDc2OCA0NDggNzY4eiIgcC1pZD0iMzIyNCIgZmlsbD0iIzJjMmMyYyI+PC9wYXRoPjwvc3ZnPg==",
        translate: "data:image/svg+xml,%3Csvg t='1666873736035' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='19423' width='32' height='32'%3E%3Cpath d='M863.288889 861.866667c22.755556 0 38.4-24.177778 29.866667-45.511111L743.822222 465.066667c-14.222222-34.133333-64-34.133333-78.222222 0L516.266667 816.355556c-8.533333 21.333333 7.111111 45.511111 29.866666 45.511111 12.8 0 25.6-8.533333 29.866667-19.911111l38.4-96.711112h179.2l38.4 96.711112c5.688889 11.377778 17.066667 19.911111 31.288889 19.911111zM637.155556 686.933333l66.844444-169.244444 66.844444 169.244444h-133.688888zM583.111111 291.555556h85.333333c15.644444 0 28.444444-12.8 28.444445-28.444445s-12.8-28.444444-28.444445-28.444444H440.888889v-44.088889c0-15.644444-12.8-28.444444-28.444445-28.444445s-28.444444 12.8-28.444444 28.444445v44.088889H156.444444c-15.644444 0-28.444444 12.8-28.444444 28.444444s12.8 28.444444 28.444444 28.444445h366.933334c-9.955556 32.711111-22.755556 64-38.4 95.288888-19.911111 38.4-45.511111 72.533333-73.955556 103.822223h-5.688889c-9.955556-11.377778-29.866667-31.288889-51.2-62.577778-8.533333-12.8-17.066667-25.6-24.177777-39.822222-5.688889-9.955556-14.222222-15.644444-25.6-15.644445-21.333333 0-35.555556 22.755556-25.6 42.666667 8.533333 15.644444 17.066667 31.288889 27.022222 45.511111 19.911111 29.866667 38.4 49.777778 52.622222 65.422222l8.533333 8.533334-157.866666 159.288888c-11.377778 11.377778-11.377778 28.444444 0 39.822223 11.377778 11.377778 28.444444 11.377778 39.822222 0l157.866667-157.866667c24.177778 25.6 51.2 52.622222 79.644444 79.644444 14.222222 14.222222 39.822222 8.533333 46.933333-9.955555 4.266667-9.955556 1.422222-22.755556-7.111111-31.288889-28.444444-27.022222-54.044444-54.044444-78.222222-79.644444 34.133333-36.977778 64-78.222222 88.177778-122.311112 19.911111-38.4 35.555556-78.222222 46.933333-120.888888z' p-id='19424'%3E%3C/path%3E%3C/svg%3E",
        knowledge: "data:image/svg+xml,%3Csvg t='1666874259163' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='27975' width='32' height='32'%3E%3Cpath d='M544.32 648a64 64 0 1 1-64-0.64V172.8a128 128 0 0 1-23.936-9.024l-44.928-22.4A128 128 0 0 0 354.496 128H192a64 64 0 0 0-64 64v575.68a64 64 0 0 0 64 64h161.792a128 128 0 0 1 58.176 14.016l71.04 36.224a64 64 0 0 0 58.176 0l71.168-36.288a128 128 0 0 1 58.112-13.952h161.984a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64h-158.208a128 128 0 0 0-55.04 12.416l-50.88 24.256a128 128 0 0 1-24 8.576v474.752zM674.24 64h158.208a128 128 0 0 1 128 128V767.68a128 128 0 0 1-128 128h-161.92a64 64 0 0 0-29.12 7.04l-71.168 36.224a128 128 0 0 1-116.288 0l-71.04-36.224a64 64 0 0 0-29.12-7.04H192a128 128 0 0 1-128-128V192a128 128 0 0 1 128-128h162.496a192 192 0 0 1 85.44 20.032l44.928 22.4a64 64 0 0 0 55.936 0.448l50.944-24.256A192 192 0 0 1 674.24 64z' p-id='27976' fill='%23515151'%3E%3C/path%3E%3C/svg%3E",
        image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjE1Nzg3NjYzODI4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjcgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjYxMjciIHdpZHRoPSIxNi4wNDY4NzUiIGhlaWdodD0iMTYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik05MzYuOTYgODkuNiA4Ny4wNCA4OS42QzM4LjQgODkuNiAwIDEyOCAwIDE3NC4wOGwwIDY5MS4yYzAgNDguNjQgMzguNCA4Ny4wNCA4Ny4wNCA4Ny4wNGw4NTIuNDggMGM0OC42NCAwIDg3LjA0LTM4LjQgODcuMDQtODcuMDRsMC02OTEuMkMxMDI0IDEyOCA5ODUuNiA4OS42IDkzNi45NiA4OS42ek05NzIuOCA4NjUuMjhjMCAxNy45Mi0xNS4zNiAzNS44NC0zNS44NCAzNS44NEw4Ny4wNCA5MDEuMTJjLTE3LjkyIDAtMzUuODQtMTUuMzYtMzUuODQtMzUuODRMNTEuMiA2NjUuNmwyNjEuMTItMjIwLjE2IDI3My45MiAyNjMuNjhjMTAuMjQgMTAuMjQgMjMuMDQgMTAuMjQgMzMuMjggMGwxMzAuNTYtMTA3LjUyIDIxNS4wNCAyMjAuMTZjMi41NiAyLjU2IDUuMTIgMi41NiA3LjY4IDUuMTJMOTcyLjggODY1LjI4ek05NzIuOCA3NTcuNzZsLTIwMi4yNC0yMDcuMzZjLTEwLjI0LTEwLjI0LTI1LjYtMTAuMjQtMzUuODQtMi41NmwtMTMwLjU2IDEwNy41MkwzMzAuMjQgMzk0LjI0Yy0xMC4yNC0xMC4yNC0yMy4wNC0xMC4yNC0zMy4yOCAwbC0yNDUuNzYgMjA0LjhMNTEuMiAxNzQuMDhjMC0xNy45MiAxNS4zNi0zNS44NCAzNS44NC0zNS44NGw4NTIuNDggMGMxNy45MiAwIDM1Ljg0IDE1LjM2IDM1Ljg0IDM1Ljg0TDk3NS4zNiA3NTcuNzZ6IiBwLWlkPSI2MTI4IiBmaWxsPSIjNTE1MTUxIj48L3BhdGg+PC9zdmc+",
        video: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjE1Nzg4MTIxNzI5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE4NzE2IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik00MjkuMDYgNzEzLjI1Yy04LjcxIDAtMTcuNDYtMS45OS0yNS42My02LjAyLTE5LjYzLTkuNzEtMzEuODItMjkuMjctMzEuODItNTEuMDZWMzY2LjgzYzAtMjEuNzkgMTIuMTktNDEuMzUgMzEuODMtNTEuMDYgMTkuMDItOS40IDQxLjI1LTcuNjkgNTguNTIgNC4zN2wyMzIuNyAxNDQuODkgMS4zMSAwLjk5YzE0LjQ3IDEwLjg3IDIyLjc3IDI3LjQ1IDIyLjc3IDQ1LjQ4IDAgMTguMDItOC4zIDM0LjYtMjIuNzcgNDUuNDhsLTEuMzEgMC45OS0yMzIuNyAxNDQuODljLTkuODYgNi44OC0yMS4zNCAxMC4zOS0zMi45IDEwLjM5eiBtMTcuNDYtMzE0Ljg3djIyNi4yM0w2MjguMTkgNTExLjUgNDQ2LjUyIDM5OC4zOHogbTAgMCIgcC1pZD0iMTg3MTciIGZpbGw9IiM1MTUxNTEiPjwvcGF0aD48cGF0aCBkPSJNODc2LjE1IDk2MGgtNzI4LjNDNjYuMzMgOTYwIDAgODk0LjEgMCA4MTMuMTFWMjA5Ljg5QzAgMTI4LjkgNjYuMzMgNjMgMTQ3Ljg1IDYzaDcyOC4yOUM5NTcuNjcgNjMgMTAyNCAxMjguOSAxMDI0IDIwOS44OVY4MTMuMWMwIDgxLTY2LjMzIDE0Ni45LTE0Ny44NSAxNDYuOXogbS03MjguMy04MjIuNTZjLTQwLjIxIDAtNzIuOTMgMzIuNS03Mi45MyA3Mi40NVY4MTMuMWMwIDM5Ljk1IDMyLjcxIDcyLjQ1IDcyLjkzIDcyLjQ1aDcyOC4yOWM0MC4yMSAwIDcyLjkzLTMyLjUgNzIuOTMtNzIuNDVWMjA5Ljg5YzAtMzkuOTUtMzIuNzEtNzIuNDUtNzIuOTMtNzIuNDVIMTQ3Ljg1eiBtMCAwIiBwLWlkPSIxODcxOCIgZmlsbD0iIzUxNTE1MSI+PC9wYXRoPjwvc3ZnPg==",
        music: "data:image/svg+xml,%3Csvg t='1666874005162' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='25026' width='32' height='32'%3E%3Cpath d='M889.374118 268.589176l25.359058-54.573176L481.882353 13.071059v595.004235a173.778824 173.778824 0 0 0-114.326588-43.489882c-96.798118 0-175.525647 78.787765-175.525647 175.525647s78.727529 175.525647 175.525647 175.525647 175.525647-78.787765 175.525647-175.525647c0-3.192471-0.783059-6.204235-0.963765-9.276235V107.399529l347.256471 161.189647z m-521.818353 586.812236c-63.608471 0-115.290353-51.681882-115.290353-115.290353s51.681882-115.290353 115.290353-115.290353 115.290353 51.681882 115.290353 115.290353-51.742118 115.290353-115.290353 115.290353z' p-id='25027'%3E%3C/path%3E%3C/svg%3E",
        shopping: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjE1Nzg4MjcyMTYwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIyNjMzIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik03NjAuOTYgNzEyLjk2SDM3Mi40OGMtMzkuNjggMC03NC4yNC0yOC4xNi04NC40OC02OS4xMkwyMDAuMzIgMjcxLjM2SDEyMC45NmMtMTcuOTIgMC0zMi0xNC4wOC0zMi0zMnMxNC4wOC0zMiAzMi0zMmgxMDQuOTZjMTQuNzIgMCAyNy41MiAxMC4yNCAzMS4zNiAyNC45Nmw5My40NCAzOTYuOGMzLjIgMTEuNTIgMTIuMTYgMTkuODQgMjIuNCAxOS44NGgzODcuODRjMTAuMjQgMCAxOS4yLTguMzIgMjIuNC0xOS44NGw1My43Ni0yNTEuNTJINDM2LjQ4Yy0xNy45MiAwLTMyLTE0LjA4LTMyLTMyczE0LjA4LTMyIDMyLTMyaDQzOS42OGM5LjYgMCAxOC41NiA0LjQ4IDI0Ljk2IDEyLjE2IDUuNzYgNy42OCA4LjMyIDE3LjI4IDYuNCAyNi44OGwtNjIuMDggMjkwLjU2djAuNjRjLTEwLjI0IDQwLjMyLTQ0LjggNjkuMTItODQuNDggNjkuMTJ6IiBmaWxsPSIjNTE1MTUxIiBwLWlkPSIyMjYzNCI+PC9wYXRoPjxwYXRoIGQ9Ik00MTcuMjggODIxLjEybS01OC4yNCAwYTU4LjI0IDU4LjI0IDAgMSAwIDExNi40OCAwIDU4LjI0IDU4LjI0IDAgMSAwLTExNi40OCAwWiIgZmlsbD0iIzUxNTE1MSIgcC1pZD0iMjI2MzUiPjwvcGF0aD48cGF0aCBkPSJNNzMwLjg4IDgyMS4xMm0tNTguMjQgMGE1OC4yNCA1OC4yNCAwIDEgMCAxMTYuNDggMCA1OC4yNCA1OC4yNCAwIDEgMC0xMTYuNDggMFoiIGZpbGw9IiM1MTUxNTEiIHAtaWQ9IjIyNjM2Ij48L3BhdGg+PC9zdmc+",
        sociality: "data:image/svg+xml,%3Csvg t='1666874393408' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='29035' width='32' height='32'%3E%3Cpath d='M3.39 303.28v473.73c0 34.13 34.62 61.78 77.28 61.78h154.58v102.98c0 11.39 15.94 22.74 30.18 22.74 0.51 0 0.69 0.03 0.78 0.07 8.27 0.96 20.35-3.81 26.58-8.76l146.35-117.03h362.9c42.67 0 77.3-27.66 77.3-61.79V303.28c0-34.13-34.63-61.79-77.3-61.79H80.68c-42.67 0-77.29 27.66-77.29 61.79z m62.7 28.37c0-22.07 22.41-39.99 50.01-39.99h650.49c27.62 0 50.01 17.91 50.01 39.99v420.03c0 22.08-22.4 39.99-50.01 39.99h-347.5c-2.03 0.89-6.85 5-8.56 6.35L291.27 893.4v-81.72c0-11.05-11.19-20.01-25.03-20.01H116.12c-27.62 0-50.02-17.91-50.02-39.99l-0.01-420.03z m-11.17-7.77' p-id='29036' fill='%23515151'%3E%3C/path%3E%3Cpath d='M935.5 68.61H214.14c-42.66 0-77.29 27.66-77.29 61.79v60.23a91.006 91.006 0 0 1 21.67-2.68h29.86V151c0-22.72 23.07-41.18 51.51-41.18h669.84c28.44 0 51.51 18.45 51.51 41.18v432.54c0 22.65-22.9 41.03-51.19 41.16v41.2h25.42c42.67 0 77.3-27.66 77.3-61.78V130.4c0.02-34.13-34.6-61.79-77.27-61.79z' p-id='29037' fill='%23515151'%3E%3C/path%3E%3Cpath d='M213.15 537.73c0 16.3 8.7 31.37 22.82 39.52a45.605 45.605 0 0 0 45.64 0 45.637 45.637 0 0 0 22.82-39.52c0-16.3-8.69-31.36-22.82-39.52a45.654 45.654 0 0 0-45.64 0 45.625 45.625 0 0 0-22.82 39.52z m0 0M395.74 537.73c0 25.2 20.43 45.64 45.63 45.64 25.21 0 45.64-20.43 45.64-45.64 0-16.3-8.69-31.36-22.81-39.52a45.654 45.654 0 0 0-45.64 0 45.604 45.604 0 0 0-22.82 39.52z m0 0M578.29 537.73c0 16.3 8.69 31.37 22.82 39.52a45.605 45.605 0 0 0 45.64 0 45.637 45.637 0 0 0 22.82-39.52c0-16.3-8.69-31.36-22.82-39.52a45.654 45.654 0 0 0-45.64 0 45.604 45.604 0 0 0-22.82 39.52z m0 0' p-id='29038' fill='%23515151'%3E%3C/path%3E%3C/svg%3E",
        download: "data:image/svg+xml,%3Csvg t='1666873884950' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='21593' width='32' height='32'%3E%3Cpath d='M808.192 246.528a320.16 320.16 0 0 0-592.352 0A238.592 238.592 0 0 0 32 479.936c0 132.352 107.648 240 240 240h91.488a32 32 0 1 0 0-64H272a176.192 176.192 0 0 1-176-176 175.04 175.04 0 0 1 148.48-173.888l19.04-2.976 6.24-18.24C305.248 181.408 402.592 111.936 512 111.936a256 256 0 0 1 242.208 172.896l6.272 18.24 19.04 2.976A175.04 175.04 0 0 1 928 479.936c0 97.024-78.976 176-176 176h-97.28a32 32 0 1 0 0 64h97.28c132.352 0 240-107.648 240-240a238.592 238.592 0 0 0-183.808-233.408z' p-id='21594'%3E%3C/path%3E%3Cpath d='M649.792 789.888L544 876.48V447.936a32 32 0 0 0-64 0V876.48l-106.752-87.424a31.968 31.968 0 1 0-40.544 49.504l159.04 130.24a32 32 0 0 0 40.576 0l158.048-129.44a32 32 0 1 0-40.576-49.472z' p-id='21595'%3E%3C/path%3E%3C/svg%3E",
        scholar: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjE1Nzg4NTI4MjgzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI3NDIzIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik0xNDEuOTQgNDA3LjY2NmwzNjguNDk1IDE5My4xMSAzNjguNDk0LTE5My4xMS0zNjguNDk0LTE5MS4wNjRMMTQxLjk0IDQwNy42NjZ6IG0zNzYuNzgtMjI3LjMybDQwNy40MzUgMjExLjI1NWMxMi45MjEgNi43IDEyLjk2MSAyNS4xNjggMC4wNyAzMS45MjNMNTE4Ljc5IDYzNy4wNDJhMTggMTggMCAwIDEtMTYuNzEgMEw5NC42NDUgNDIzLjUyNGMtMTIuODkyLTYuNzU1LTEyLjg1Mi0yNS4yMjMgMC4wNy0zMS45MjNsNDA3LjQzNC0yMTEuMjU1YTE4IDE4IDAgMCAxIDE2LjU3MSAweiIgZmlsbD0iIzUxNTE1MSIgcC1pZD0iMjc0MjQiPjwvcGF0aD48cGF0aCBkPSJNNzM4LjQ0MyA0OTYuOTE4YzAtOS45NDEgOC4wNi0xOCAxOC0xOCA5Ljk0MSAwIDE4IDguMDU5IDE4IDE4djI5Ni4yOGExOCAxOCAwIDAgMS0xMC4zNTMgMTYuMjk1TDQ5Ny4yOTggOTM0LjY4MmExOCAxOCAwIDAgMS0xNS43MDEtMC4xOThsLTI1MC4xODMtMTI1LjE5YTE4IDE4IDAgMCAxLTkuOTQ1LTE2LjA5N1Y0ODEuNGMwLTkuOTQyIDguMDYtMTggMTgtMTggOS45NDEgMCAxOCA4LjA1OCAxOCAxOHYzMDAuNjc3bDIzMi40MzUgMTE2LjMwOCAyNDguNTQtMTE2LjYyNFY0OTYuOTE4eiIgZmlsbD0iIzUxNTE1MSIgcC1pZD0iMjc0MjUiPjwvcGF0aD48cGF0aCBkPSJNODY0LjEyIDUxMC45OGMwLTkuOTQyIDguMDU4LTE4IDE4LTE4IDkuOTQgMCAxOCA4LjA1OCAxOCAxOHYyMjkuMDk3YzAgOS45NDEtOC4wNiAxOC0xOCAxOC05Ljk0MiAwLTE4LTguMDU5LTE4LTE4VjUxMC45Nzl6IiBmaWxsPSIjNTE1MTUxIiBwLWlkPSIyNzQyNiI+PC9wYXRoPjwvc3ZnPg==",
        news: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjE1Nzg4NjA5MjMxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI4NDc0IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik02NjYuMDg3IDIzOS4yNzdoMTU1LjY2di0zOC45MTNoLTE1NS42NnYzOC45MTN6IG0tNzcuODMtMzguOTEzaC0yMzMuNDl2MjMzLjQ4OGgyMzMuNDlWMjAwLjM2NHogbS0zOC45MTUgMTk0LjU3NGgtMTU1LjY2di0xNTUuNjZoMTU1LjY2djE1NS42NnogbS0xOTQuNTc2IDM4OS4xNWg0NjYuOTgxdi0zOC45MTVIMzU0Ljc2NnYzOC45MTV6TTg4MC4xMTkgNjQuMTZIMjk2LjM5NGMtNDIuOTg0IDAtNzcuODMgMzQuODQ2LTc3LjgzIDc3LjgzdjE5LjQ1OGgtNzcuODNjLTQyLjk4NCAwLTc3LjgyOCAzNC44NDYtNzcuODI4IDc3LjgzdjY0Mi4wOThjMCA0Mi45ODQgMzQuODQ1IDc3LjgzIDc3LjgyOCA3Ny44M0g4ODAuMTJjNDIuOTg2IDAgNzcuODMxLTM0Ljg0NiA3Ny44MzEtNzcuODNWMTQxLjk5Yy0wLjAwMS00Mi45ODQtMzQuODQ2LTc3LjgzLTc3LjgzMi03Ny44M3ogbTM4LjkxNyA4MTcuMjE2YzAgMjEuNDkzLTE3LjQyNCAzOC45MTctMzguOTE3IDM4LjkxN0gxNDAuNzM0Yy0yMS40OTEgMC0zOC45MTUtMTcuNDI0LTM4LjkxNS0zOC45MTdWMjM5LjI3N2MwLTIxLjQ5MSAxNy40MjQtMzguOTEzIDM4LjkxNS0zOC45MTNoNzcuODN2NTgzLjcyNGgzOC45MTVWMTQxLjk5YzAtMjEuNDkzIDE3LjQyMi0zOC45MTUgMzguOTE1LTM4LjkxNUg4ODAuMTJjMjEuNDkzIDAgMzguOTE3IDE3LjQyMiAzOC45MTcgMzguOTE1djczOS4zODZ6IG0tNTY0LjI3LTIxNC4wMzNoNDY2Ljk4MXYtMzguOTE1SDM1NC43NjZ2MzguOTE1eiBtMzExLjMyMS0zMzAuNzc2aDE1NS42NlYyOTcuNjVoLTE1NS42NnYzOC45MTd6IG0wIDk3LjI4NmgxNTUuNjZ2LTM4LjkxNWgtMTU1LjY2djM4LjkxNXpNMzU0Ljc2NiA1NTAuNmg0NjYuOTgxdi0zOC45MTdIMzU0Ljc2NlY1NTAuNnoiIHAtaWQ9IjI4NDc1IiBmaWxsPSIjNTE1MTUxIj48L3BhdGg+PC9zdmc+",
        mine: "data:image/svg+xml,%3Csvg t='1666874111000' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='27179' width='32' height='32'%3E%3Cpath d='M949.888 457.258667c26.069333-29.824 13.866667-67.52-24.789333-76.309334L681.728 325.546667l-127.786667-214.677334c-20.266667-34.069333-59.925333-34.090667-80.213333 0l-127.786667 214.677334-243.370666 55.381333c-38.442667 8.746667-50.858667 46.506667-24.789334 76.309333l164.394667 188.053334-22.613333 248.917333c-3.584 39.466667 28.458667 62.805333 64.896 47.146667l237.781333-102.037334a21.333333 21.333333 0 0 0-16.810667-39.210666L267.626667 902.186667c-6.698667 2.88-6.229333 3.221333-5.568-4.096l24.277333-267.093334-176.426667-201.813333c-4.757333-5.461333-4.906667-5.034667 2.133334-6.634667l261.205333-59.434666 137.152-230.4c3.733333-6.293333 3.136-6.293333 6.869333 0l137.173334 230.4 261.205333 59.434666c7.125333 1.621333 6.954667 1.088 2.133333 6.613334l-176.426666 201.813333 24.256 267.093333a21.333333 21.333333 0 1 0 42.496-3.84l-22.613334-248.917333 164.394667-188.053333z' fill='%233D3D3D' p-id='27180'%3E%3C/path%3E%3C/svg%3E"
      };
      var SEJ_ICON_CACHE_KEY = "searchEngineJumpIconCache";
      var sejIconCache = GM_getValue(SEJ_ICON_CACHE_KEY) || {};
      if (!sejIconCache || typeof sejIconCache !== "object" || Array.isArray(sejIconCache)) {
        sejIconCache = {};
      }
      var sejIconCachePending = {};
      var sejIconCacheFailed = {};
      function getFallbackIcon() {
        return icon.web || icon.google || "";
      }
      function normalizeIconSource(src) {
        return (src || "").toString().trim();
      }
      function isDataIcon(src) {
        return /^data:image\//i.test(src);
      }
      function isRemoteIcon(src) {
        return /^https?:\/\//i.test(src);
      }
      function escapeAttr(value) {
        return String(value || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }
      function getCachedIconValue(src) {
        var cached = sejIconCache[src];
        if (typeof cached === "string") {
          return cached;
        }
        if (cached && cached.data) {
          return cached.data;
        }
        return "";
      }
      function getIconRenderData(src) {
        var rawSrc = normalizeIconSource(src);
        var fallback = getFallbackIcon();
        if (isDataIcon(rawSrc)) {
          return {
            src: rawSrc,
            rawSrc,
            saveSrc: rawSrc
          };
        }
        if (isRemoteIcon(rawSrc)) {
          var cachedSrc = getCachedIconValue(rawSrc);
          if (cachedSrc) {
            return {
              src: cachedSrc,
              rawSrc,
              saveSrc: cachedSrc
            };
          }
          cacheRemoteIcon(rawSrc);
          return {
            src: fallback,
            rawSrc,
            saveSrc: rawSrc
          };
        }
        return {
          src: fallback,
          rawSrc: "",
          saveSrc: fallback
        };
      }
      function getIconSourceAttr(iconData) {
        if (iconData && isRemoteIcon(iconData.rawSrc)) {
          return 'data-iqxin-icon-src="' + escapeAttr(iconData.rawSrc) + '"';
        }
        return "";
      }
      function inferIconMime(src) {
        var path = String(src || "").split("?")[0].toLowerCase();
        if (/\.svgz?$/.test(path)) return "image/svg+xml";
        if (/\.jpe?g$/.test(path)) return "image/jpeg";
        if (/\.gif$/.test(path)) return "image/gif";
        if (/\.webp$/.test(path)) return "image/webp";
        if (/\.ico$/.test(path)) return "image/x-icon";
        return "image/png";
      }
      function getResponseIconMime(response, src) {
        var headers = response.responseHeaders || "";
        var match = headers.match(/content-type:\s*([^;\r\n]+)/i);
        var contentType = match ? match[1].trim().toLowerCase() : "";
        if (contentType && !/^image\//.test(contentType)) {
          return "";
        }
        return contentType || inferIconMime(src);
      }
      function arrayBufferToDataUri(buffer, mime) {
        if (!buffer) {
          return "";
        }
        var bytes = new Uint8Array(buffer);
        var binary = "";
        var chunkSize = 32768;
        for (var i = 0; i < bytes.length; i += chunkSize) {
          binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
        }
        return "data:" + mime + ";base64," + btoa(binary);
      }
      function getIconQueryRoots() {
        var roots = [document];
        var settingHost = document.querySelector("#sej-setting-host");
        if (settingHost && settingHost.shadowRoot) {
          roots.push(settingHost.shadowRoot);
        }
        return roots;
      }
      function applyCachedIcon(iconSrc, dataUri) {
        getIconQueryRoots().forEach(function(root) {
          root.querySelectorAll("img.sej-engine-icon[data-iqxin-icon-src]").forEach(function(img) {
            if (img.dataset.iqxinIconSrc === iconSrc) {
              img.src = dataUri;
            }
          });
          root.querySelectorAll("[data-iqxinimg]").forEach(function(engineDom) {
            if (engineDom.dataset.iqxinimg === iconSrc) {
              engineDom.dataset.iqxinimg = dataUri;
              var img = engineDom.querySelector("img.sej-engine-icon");
              if (img) {
                img.src = dataUri;
                img.dataset.iqxinIconSrc = iconSrc;
              }
            }
          });
        });
      }
      function cacheRemoteIcon(src) {
        if (!isRemoteIcon(src) || getCachedIconValue(src) || sejIconCachePending[src] || sejIconCacheFailed[src]) {
          return;
        }
        sejIconCachePending[src] = true;
        GM_xmlhttpRequest({
          method: "GET",
          url: src,
          responseType: "arraybuffer",
          timeout: 1e4,
          onload: function(response) {
            delete sejIconCachePending[src];
            if (response.status < 200 || response.status >= 400 || !response.response) {
              sejIconCacheFailed[src] = true;
              return;
            }
            var mime = getResponseIconMime(response, src);
            if (!mime) {
              sejIconCacheFailed[src] = true;
              return;
            }
            var dataUri = arrayBufferToDataUri(response.response, mime);
            if (!dataUri) {
              sejIconCacheFailed[src] = true;
              return;
            }
            sejIconCache[src] = dataUri;
            GM_setValue(SEJ_ICON_CACHE_KEY, sejIconCache);
            applyCachedIcon(src, dataUri);
          },
          onerror: function() {
            delete sejIconCachePending[src];
            sejIconCacheFailed[src] = true;
          },
          ontimeout: function() {
            delete sejIconCachePending[src];
            sejIconCacheFailed[src] = true;
          },
          onabort: function() {
            delete sejIconCachePending[src];
            sejIconCacheFailed[src] = true;
          }
        });
      }
      var engineList = {};
      engineList.web = [];
      engineList.web[0] = {
        name: "百度",
        url: "https://www.baidu.com/s?wd=%s&ie=utf-8",
        favicon: icon.baidu
      };
      engineList.web[1] = {
        // 搜索引擎名称
        name: "Google",
        // 搜索引擎地址,关键字变量用%s代替
        url: "https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8",
        // 搜索引擎的站点图标
        // favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACyElEQVQ4jXWT72tTdxTGv4yN+cY/oMFGqQpD7ZjtsAF/oPEXGFhtbUEn4mSTatSJVua0UNNSEG/01UAH0m6dN1hdW5SbrE3sgkr1hb9lRTFW3Upqcy1NzE1yc/Prfvaia7dM+7w853keznM4R4h38aHdbt8gSZJbURSv3++/Jsuyp6GhwWm1Wsvew/8XNptteTAYvMEMiKjquMvlahVCzHpHXFdXV69pWhLAHHtNSm7nbdMhYo170U61kLkZnDZSFMUrhJg9La6qqrLpum4A6FcuM+5YReRTK5HyUiLlViJLSolULiB2eA+mFgdAlmWPEOIDIYT4aHBw8DaA3tODavuESMV8orvqSZ7/Af1XD/HW71HXVKKdbsPUU9OT1NTU1Aq73b4BgPhLJrYtY2zxQuKtxzATWlH+/MvnYJpFtUAgMCDcbvcZAHOkjXSHIH50LYW3iZn2WIRoNBoTiqJ4AfIPq8n1CwrDB4pIPw5kcP6k0+hJ0+hJ8+0vaU5eNdCzk30RCAQGAPL311PwCnjVXGSw+7zOvIMa5UcTVDQl+Ox4Aoc7yfg/QwpZlj0A5pNvML2Cp/d2FhmExgrceZHn0Z952q9nqGhKsONsCiMP2Ww2J5xO534A481V3N1lLL24md/Dd96b2dWdZfF3Gi29xqR5KDQsSkpK5kaj0ZhhFtgVbKOkfTUru7+kK+RjNKkSzyR4FgvRHOzn8+YJVrakefxXHgBJkk4LIYRwuVytAOHUG7b2H8basZr5netY2/sVm737WHZpC3M6VrDk3Aku3Jq8g9HR0TGLxWKdOsaPfT7fbwBaLsWZBx1svPI1i+RNlP28jsquLWz3H8E3cg0AwzAyDofji/+/w+zOzs4LU3mTZprHE8+4q/7BcGJkeg/hcPh1dXV1zYwfWVtbW9fX1+dXVXV8SpTL5fJDQ0NPJElyWyyW0v/y/wbuo60BpWkyAAAAAABJRU5ErkJggg==',
        favicon: icon.google,
        // 弃用；搜索引擎编码（默认utf-8）如果跳转后乱码可以填写 'gbk'
        // 弃用：encoding: 'utf-8',
        // 如果网站使用的gbk编码
        gbk: false
        // 新标签页打开
        // blank:true,
        // 禁用该搜索, 只在设置中显示该搜索
        // disable:true,
      };
      engineList.web[2] = {
        name: "必应",
        url: "https://cn.bing.com/search?q=%s",
        favicon: icon.bing
      };
      engineList.web[3] = {
        name: "360",
        url: "https://www.so.com/s?ie=utf-8&q=%s",
        favicon: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB60lEQVR4nIWTvWtTURTAf+e+GpPWRFptmigIDhWELo5+DKLCMxZEJfVjEhTqok4O/geik2MdOuhUm4ogpTS6iNQoRV3sIOqQgpiX2NKEprH58B2HvMQEUnO3ezi/3/m4XKHD2fvywrCr1oirbvWPuh9XYs8znfIApPUSmR97KHAbaY8rVIBxx0487iz4ML4tsrrmCAxsVckTpRw7cbQ1ZgCiq2vLDViVSatAb8ZOSMZOiEttCFj0qh2Jzo8l2jqIJOM3BJmowxJ3Tk8/61Q9koxPCnINwHXN/mzsaRrACDzwcl5vBQM49sx1VDcARNxHLSNIqG51b/5vfgAVuV/vm+NtOwAI6sb3rgKVhTqP75+gpvTlK2SswM5ughoa9a9XQdGmYKK0pF9CKZYqi7e6CT5XF+5+63vLlcKP5UZMirODUz1GLgFsL2pQLv4qdoLLc7sPKeYTQEnN1YFR5wmA6DS+8o5wuT6jbmLMwUAsm26Ff8+GT4nhFYBCPnAm19/sAKD0InzY9JBqEspPRd8g+FE5IULIg93NcnmXz+c7aYnMqOqUAeg9m3unRofVe2eEPSJyWZBzDRjVtN+SUP/5Qt4S2efVP9D2aQBKc4PHBO6IyohCVeA9uPf8oytfW/PWk0PhoJ3NdVt81/MXwby4bACYqGIAAAAASUVORK5CYII="
        // disable:true,
      };
      engineList.web[4] = {
        name: "yahoo",
        url: "https://search.yahoo.com/search;?p=%s",
        favicon: "data:image/svg+xml,%3Csvg t='1666872979419' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='13466' width='32' height='32'%3E%3Cpath d='M513.216 69.568C332.224 69.568 161.216 45.76 0 0v1024c161.408-45.824 332.416-69.632 513.216-69.632 178.816 0 349.376 23.232 510.784 69.632V0c-161.408 46.4-331.776 69.568-510.784 69.568z m283.584 87.424l-6.208 9.792c-5.824 9.216-11.008 17.024-18.176 28.032-9.6 14.4-27.584 43.008-49.216 79.808-6.016 10.176-13.376 22.4-20.992 35.584l-44.032 74.368-16.384 28.608-43.392 75.584c-14.592 25.792-28.992 51.2-43.392 76.416v25.408c0 35.2 0.768 73.6 1.984 107.776 0.576 15.616 1.216 43.392 1.984 72.768 0.768 35.008 1.6 71.232 2.624 89.6l0.192 5.632v0.576l-6.016-1.6-6.976-1.792a197.952 197.952 0 0 0-22.592-3.584 172.224 172.224 0 0 0-28.416 0 195.712 195.712 0 0 0-29.568 5.376l-6.016 1.6v-0.576l0.192-5.632c0.832-18.176 1.792-54.592 2.624-89.6 0.576-29.376 1.408-57.216 1.984-72.768a2721.92 2721.92 0 0 0 1.984-107.776v-25.408L425.6 488.768c-14.208-25.024-28.992-50.624-43.2-75.584-5.632-9.6-11.008-19.2-16.384-28.608-12.8-22.208-29.376-49.984-44.032-74.368a2038.784 2038.784 0 0 1-20.992-35.584 1986.112 1986.112 0 0 0-49.216-79.808c-7.168-11.008-12.416-18.816-18.176-28.032l-6.208-9.792 11.2 3.2c14.208 4.032 28.8 6.016 44.416 6.016s30.592-1.984 44.608-6.016l3.392-1.024 1.792 3.008c27.584 49.792 101.824 171.776 146.176 244.8 15.168 25.216 27.392 44.992 33.408 55.168v-0.192 0.192l33.408-55.168c44.416-72.832 118.592-194.816 146.176-244.8l1.792-3.008 3.392 1.024c14.016 4.032 28.992 6.016 44.608 6.016s30.208-1.984 44.416-6.016l10.624-3.2z' p-id='13467' fill='%234C07A2'%3E%3C/path%3E%3C/svg%3E",
        disable: true
      };
      engineList.web[5] = {
        name: "搜狗",
        url: "https://www.sogou.com/web?query=%s",
        favicon: "data:image/svg+xml,%3Csvg t='1666872860655' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='11496' width='32' height='32'%3E%3Cpath d='M716.8 0c169.664 0 307.2 137.536 307.2 307.2v409.6c0 169.664-137.536 307.2-307.2 307.2H307.2C137.536 1024 0 886.464 0 716.8V307.2C0 137.536 137.536 0 307.2 0h409.6z m91.904 305.536c-18.304-22.016-176.1792-92.8384-333.8496-87.6672-157.6704 5.1712-277.568 84.3904-277.568 155.6864 0 71.3088 22.5408 161.3824 277.568 192.5632 221.4912 30.336 114.3424 113.8944 0 113.8944s-180.0832-41.1776-228.8256-41.1776c-48.7424 0-81.856 42.3808-21.2224 96.5888 55.36 49.4976 158.6304 62.1056 252.8512 69.568C571.8784 812.4544 832 794.88 832 638.8352c0-152.9088-205.8624-196.3776-294.5024-206.0416-88.6272-9.6768-131.1232-44.0064-131.1232-59.2384 0-15.5264 37.5552-54.0544 123.2512-44.096 85.696 9.9584 182.6304 44.096 221.696 44.096 39.0784 0 75.6992-46.0032 57.3824-68.0192z' fill='%23FF7D2A' p-id='11497'%3E%3C/path%3E%3C/svg%3E",
        disable: true
      };
      engineList.web[6] = {
        name: "Startpage",
        url: "https://www.startpage.com/do/asearch$post$query",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA9ElEQVR4nO2WTUoDQRBGX5txIMRs/EFBAm49iEfxBN5J8AAeZwwkgmTR6e6ZHsNMDO2iFkEyibqQcVG1+aq74KvXteky9w8p0WMc9dlcARRAARRAARTgXwBk+z5jYyA/3p7zvDv/Ltp2N2/XoilBNj4Rw6sLuDyXwuRa9OxUdDz6ajoc/hwAYLUSrertnV2KmpT6XUiyvzBtGplxjPLksooA+FAB4HzZDdA0a2Ksmb2+4XzJYmFxPlBM51jr8aHCLgPOBQDqd5ntx2ZzECgbDPbWzOPTcyqmM5wvKV7mOw26zA8Z/jbMze2dLqUKoAAKoAC9xic+GmK9S0OJvAAAAABJRU5ErkJggg==",
        disable: true
      };
      engineList.web[7] = {
        name: "Yandex",
        url: "https://yandex.com/search/?text=%s",
        favicon: "data:image/svg+xml,%3Csvg t='1666872628734' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='10516' width='200' height='200'%3E%3Cpath d='M451 1024V691.8L229 96h111.6l163.6 459.4L692.4 0h102.6L553.6 695.6V1024h-102.6z' p-id='10517' fill='%23FC401D'%3E%3C/path%3E%3C/svg%3E"
      };
      engineList.web[8] = {
        name: "DDG",
        url: "https://duckduckgo.com/?q=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADiElEQVQ4jXWTfVDTBRjHn+uyi8KAbWz7/TbeNzeUeNkLCljGS3hrspDUsC7vqivz5cI/OtQ7vSxNrpvdkQx0k10M5FYgztECgfOoM7kurs6IFx1ja7xsgMiLAySDffvDtLrs8/fz+T7PH8+X6BFIQymxOGb1WyWy8COH13LL9svCSgtEoTt4RMyj5h/CIRKfSImsMKu4NrOKZ6vZwDafz2Tbajaw9ur1wibzemHj+7Lwo0S06j9yYtgqRX0m216lFDS0FCR3Obcl3/FvFmJCFwt/0Rr0aOPGrVlsuymduVShEljDiCL+3hxCUbWZTLtBwfuqXyeZCThqsTTUj0BrPUZ2psGTE4mxQilmt8twLT/WVaUSXvgsjW8hoseJiOhYUuTpSqWw8YYmPjC6JQ5TtXqsLAYAAMu3fLj9eSk8eQw8OimmXpGjMzfWaU5nv94RvfodkoQ+se6cmm2+tDGqe1Ijxm+HXsd4IIi5+WUAQBDA6MRdePdq4c4Xw12wBlNFifginW0tTxN8Sa9Gh+02qlh7v0ayOJTNh8d4Ev7AMq4P+BAM3g/4rm8KvdVn4H6exWCOHMMaOTqzY1wGJXORDkg5H1ermZYRnQyubCEG9R/Av7CCsnOd+P3eCgCg68YCbnZ0YGyXCLf0AowfjML1PMm8UcHaqVTOO1WjFnWMFMjgyhWjZ48OC3/cPx9YRnD6POArAoZSsfT9k7jTEIHR/THoyZXerVYzLfReQvjRs0qRw7NFBmd+HH4pTMXk6Mhf/jTg4WDGRBjex4f33Th43ojHoEaG7nzJXKWSsdHLwmd2VSmE9h9flMwNaqT4NSca3mudeMCs4xDGj4fgdiUfc1YOJssF8OpkcGTF9FUomIvEIRIb0li7RSX+dqxAjt6NAgxYDA8Dpq116E+JhHdzPJxaKfpyZBjWymFQsPZPkvgWIiLancA9Up7C2K5sivd6XxCh98MS+JYmMDzvxqJ7AN2FctSVKtC9dS18LyWiXh3dZVKK257jPaV98IxPn0oWNpYlCera1cxN/55itLpt2H45A3uvbMObjiy89pMWP7ydioZk0dXyFNZWIuGW/asLoUR8fZLQenod325MlzsuXLVMHnMeRIXrLC67G4OHP8roPZ4hajI9y7YdSOB9+n+FfKw4KmLfSUlEbdPOvJ9dJv3sUnMTZmqM9yypsd+ckHLNm7ghW/8p/Alp3+8i87OHIgAAAABJRU5ErkJggg==",
        disable: true
      };
      engineList.video = [];
      engineList.video[0] = {
        name: "bilibili",
        url: "http://search.bilibili.com/all?keyword=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAwElEQVQ4ja2Syw2DQAxEhwvdIHEklENFUIIN5EAftGAjigA6cA58krBZaZMwki+7nqfR7gC7zCLQUKDRBD41moCGAmaRe9mOKUgMrAsayVyzZGBdQGJox9QFmEVgbT9CXs2k9/cEncUgKcEyrQsBs+6W6CwGSMpgozslQDKDxFBr7n28s2rNN8CMg/atDt8ZwNqDtXcM53MvwJfIu3d5glBdCZi3ht2Czfs3skwAa/VzkVirZ5WPJEEzg7Vaq/ynHh0yOLrBLqn3AAAAAElFTkSuQmCC"
      };
      engineList.video[1] = {
        name: "YouTube",
        url: "https://www.youtube.com/results?search_query=%s",
        favicon: "data:image/svg+xml,%3Csvg t='1666872437167' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='8429' width='32' height='32'%3E%3Cpath d='M426.666667 682.666667V384l256 149.845333L426.666667 682.666667z m587.093333-355.541334s-10.026667-71.04-40.704-102.357333c-38.954667-41.088-82.602667-41.258667-102.613333-43.648C727.168 170.666667 512.213333 170.666667 512.213333 170.666667h-0.426666s-214.954667 0-358.229334 10.453333c-20.053333 2.389333-63.658667 2.56-102.656 43.648-30.677333 31.317333-40.661333 102.4-40.661333 102.4S0 410.538667 0 493.952v78.293333c0 83.456 10.24 166.912 10.24 166.912s9.984 71.04 40.661333 102.357334c38.997333 41.088 90.154667 39.765333 112.938667 44.074666C245.76 893.568 512 896 512 896s215.168-0.341333 358.442667-10.752c20.053333-2.432 63.658667-2.602667 102.613333-43.690667 30.72-31.317333 40.704-102.4 40.704-102.4s10.24-83.413333 10.24-166.869333v-78.250667c0-83.456-10.24-166.912-10.24-166.912z' fill='%23FF0000' p-id='8430'%3E%3C/path%3E%3C/svg%3E"
      };
      engineList.video[2] = {
        name: "抖音搜索",
        url: "https://www.douyin.com/search/%s",
        favicon: "data:image/svg+xml,%3Csvg t='1666873215809' class='icon' viewBox='0 0 1029 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='17442' width='32' height='32'%3E%3Cpath d='M259.3792 385.3312m-170.5984 0a170.5984 170.5984 0 1 0 341.1968 0 170.5984 170.5984 0 1 0-341.1968 0Z' fill='%2303F9AD' p-id='17443'%3E%3C/path%3E%3Cpath d='M403.968 568.4224m-170.5984 0a170.5984 170.5984 0 1 0 341.1968 0 170.5984 170.5984 0 1 0-341.1968 0Z' fill='%23F9F90B' p-id='17444'%3E%3C/path%3E%3Cpath d='M631.3984 622.2848m-88.6784 0a88.6784 88.6784 0 1 0 177.3568 0 88.6784 88.6784 0 1 0-177.3568 0Z' fill='%230FF420' p-id='17445'%3E%3C/path%3E%3Cpath d='M753.0496 565.248m-88.6784 0a88.6784 88.6784 0 1 0 177.3568 0 88.6784 88.6784 0 1 0-177.3568 0Z' fill='%23DA0DF7' p-id='17446'%3E%3C/path%3E%3Cpath d='M594.0224 369.3568m-223.0272 0a223.0272 223.0272 0 1 0 446.0544 0 223.0272 223.0272 0 1 0-446.0544 0Z' fill='%23FF0000' p-id='17447'%3E%3C/path%3E%3Cpath d='M901.12 1024h-778.24c-67.584 0-122.88-55.296-122.88-122.88V122.88c0-67.584 55.296-122.88 122.88-122.88h778.24c67.584 0 122.88 55.296 122.88 122.88v778.24c0 67.584-55.296 122.88-122.88 122.88z' fill='%23070103' p-id='17448'%3E%3C/path%3E%3Cpath d='M829.44 268.0832c-89.7024-0.1024-162.304-72.8064-162.304-162.4064 0-1.024 0.1024-2.048 0.1024-3.072h-72.4992v-19.456c-0.7168 7.3728-1.1264 14.9504-1.1264 22.528s0.4096 15.0528 1.1264 22.528v576.7168h-1.7408c0 89.7024-72.704 162.4064-162.4064 162.4064s-162.4064-72.704-162.4064-162.4064 72.704-162.4064 162.4064-162.4064c36.7616 0 70.5536 12.1856 97.792 32.768v-85.0944a234.496 234.496 0 0 0-97.792-21.1968c-130.3552 0-235.9296 105.6768-235.9296 235.9296 0 130.3552 105.6768 235.9296 235.9296 235.9296s235.9296-105.6768 235.9296-235.9296c0-0.7168 0-1.4336-0.1024-2.1504h0.1024V276.1728a235.4176 235.4176 0 0 0 162.9184 65.536v-73.6256z' fill='%23FFFFFF' p-id='17449'%3E%3C/path%3E%3C/svg%3E"
      };
      engineList.video[3] = {
        name: "优酷",
        url: "http://www.soku.com/search_video/q_%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABnElEQVQ4jZ2Sv2vCUBDHv4OFYEAeRrFihjeYLl3eILRDhkcXKQg6tWAHs4W6WBAq2CWCFLe4CS7ZOhWyuHTK4uDmpKtD/4As3dOhOYk/SrGBg3fc+37u7vsCAOztPud/DXhEseoUN7cX6Qbi7/Yi3Vh1ihuqT+pZDwADAIyqzE2KKWatfEDiY/W5XVgCAGatfEBdm0K1mkK1+pI5NAF1jgWsKVSLIE2hWr92GFWZCwCUJ1ea24Xl14BHfckcAIDJFTmpZz0qUJhckX8CyINRlbnnDDw5kckVmVzB5Ip8vMo87ayw/wIUnz093AceMxkAWF8yh8z87Onh233Ov8yfCbpgckVSo7ldWMa7s1h+zjV77Gfunl0SKNcNS+t6AUqGUG8enuhMdc0e+5o99gEAqXJF6tN1pE/XEYkpz9Tajtb1AjoTgOqpckXuAJLiorsIUTLESYB9MQD8C5B/eV+SSScBNHvs70MIwFpD78CzkiEOTGStoZcEZmptZ5t3vaDoLkJ9uo4Krx+bn3lKhtjuTT9GDImfliWhW3Hs0Tdk6pGCP1WKswAAAABJRU5ErkJggg=="
      };
      engineList.video[4] = {
        name: "腾讯视频",
        url: "https://v.qq.com/x/search/?q=%s",
        favicon: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACNUlEQVR4nK2SS0iUYRSGn/P/42UcLCXDIoykaKhlSVCbGlu1MkgSJKE20saoyG2Q7QNpF0RIi6goXKQkLoIQhjBCNBAddFLGWw0q3ua/nxa/82eF0KID3+K7vC/Peb8DO+pKWi80p9W5mtbH/GPJzs3loUAFkOKp6GylbSR7UmLtZmDoAI06gE4P78+2nj7FvorPuB64HnieHF41tdD00c/sSqDvREHpPXF2zj24eAgRBBida2d4phORkCiEMu73peTh7wZvRQGeNJzbiu/JVYSC0EQERnIdfJm9HRmpqDN40SxHQp2BDTjgyHLcsn2aEkNcivfjOAa2E3Cytpu2M/WUmrPYruI6lKbe+0GqX4+GBM8MRaA7VYsI3Kqbj/BWvEle5htDIoGJpTbS2a5tOiHmm/UGFmBBwfax7AAliAyqY8e5eSBHmVeHZfkcqerBdn0sByxH2fDd0Rh2mJBl+wjClreKIWa4MBlf72Vxc4piNpZtIGj41aJPY1gCohTsAAE2/B+YlLDsZHk+3RKFZ3s1vB4ZRUTDFmAqc6PsTgw7jHtzrdqPlefNnonrLBbGoz5F4EPmBQtrKRDdNtQ3ufZ4M0AMJ+x374qxtVITVH5b/RoJx+Y7GVsozsI2NpLMd8QniznFsJnAkGTD0rLftzdARPg084ip/DUoCgFBX63fS7T8NYkAerdkMBuv+p5MZFqVkl8X4W3WtRLHeCDBn+LoSVRdGx4iZjggOqR+4vxuwv9WPwHg2/J5NFR2OgAAAABJRU5ErkJggg=="
      };
      engineList.video[5] = {
        name: "AcFun",
        url: "https://www.acfun.cn/search/?type=complex&keyword=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADfElEQVQ4jX3MbUzUdQDA8b/1xrW1tlhrtmatF1qrVk5opajLUScgJtoIxXjQ1iobqzaV1MCWqZm2EumO8+C4Bw4OMsC8EGgeWkqi8vy/P8cBJ8cdTwccj/6u+4/79qLVy77b9+1Hcvb4Q2/oukS6SRZZ5YrItLpEpkUW71pkkVgRFO+b/xTZpjaRYXGLTKtLZJUrYpdZFhpdl6htHwpJSSVukkr7SDV5iNcqpJR5eK9S5hW74LjRyrcXCkmyTbKn0kuKsY94rUKa1cN2k4fXi3uRMiwusblYIafKS0FjgG0lCqvLwphs5/EVPk+sXZD9k4/kkl52mvspaAqwUddLvE4hy6IIKUHbKfKbAtwcmqfZO4dveoHnKiDb1EqbLpkXqyOsqoY1himGphZpH7mPdyrMSecIa87cEdLnlwbFF40BfmyZoEYOsQgMd15G+9UOFMMWhg3x1J3YSGdLHTfno/zcOcW/7atQhLTV0C2OXvHjUGbIKXcTBGZvFcEhCbX4SdA+AoclFp2HqFqE75tH/wMK6geFlGNTRFiNAnDs+hK3w9B2PgH13EOM6V5iTL+WvwofpjV/BUEV6obg+G/D2LtCHKsfFNIHdrcgusTcEuT5obPmBDN5EsEfnmBK/zKh4hcY18cy+tkDdBW9ybAKehe4/CEO/zIgpCyrIpx+ldnQGO1nXgXdMqKODSg6DSHtM8yeXo773AbUoBuqH6PxwxWw4CcgIMvqEtLRSx5xbQFqzPlwRCJ33TLWxq3nXscNVG0Mc2cfJSg3kLb3INt3ZhAtkGg8GYdjHs5e9QqpWRkXWj8cOfA23F3Jyth9SMtXoQYHWGo+yMwtI0QmiXn8aR6MWQfBWvK+/Jhv2iPc9k4KKc3YLVYXBflE7wChsL+ogafW5xIdbSI67UUdkWHOyabsU8Tt/RrCPnIvh3j2Ow/bDN1C2m2WRYK+l7fq70OfA3QfEf69HGabQa6CHjtMXyVyx86S9gD06Pm0IcBrF3ykl8n/AFvN99hT42f8j2oi1aeIdNcy0X+N8dZaxlouMqE4CSu/ol48zex1C/sdwySU+cgwuYSUWOom1eRmt9XDFtsomivzaCrHSDQMkGwLkGIbJbF0EI0tQGLDPBr7OO+YPaSX95OgdyPV3h0KbSrsEOkmWewwKiL1/y51iVSjItJNsthc1CFMN7yhvwH03PqrfJ8h8gAAAABJRU5ErkJggg=="
      };
      engineList.video[6] = {
        name: "搜狐",
        url: "http://so.tv.sohu.com/mts?wd=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACk0lEQVQ4jW2SXUhTYRjHf2furH1vns0tc+p01YbSaRRGFGmElRWhRVR0VzeBCUkRKRQUURFBUYtMsAsvwqSLboqKii76oOjLLsKwLBLOjsM+iBEiEk8XOtCDD7zwwvv//57/+7wvWEpX1WUXqud33U1XPn+2cuHgm4bk9xeNqc+Xl1f0eiFi1c8s+wHNd6gzWpxZ7XXtrHBQMx/itR413RYPdbysXzQ80qxPnFkay8zp3jXP1V7ncPS74BbQD6ywavbGQm25lrTcXJN4OOtgS5G6L4oyDogNRYDfpdCUBN0KaYp4t+da0nJcX3AeAB+EU9gmAFGnzH8B2xlcmTElJBk8N6yQW8vjT7Lblv7zQZj1FHUVzNOAdoBruHsNRRMzlJCPkUVja7E3FQBxB6nRzbqc0MsuosKwfdpcBJOAE+Aq7l4DTQybJmY0KWagUnpw3wb8AN8aUuMvG2uGscFPUMSOIgrkC10yBQCaGASksL+Cqw/gQ13C/LKhJo8Xfi7DLo6p+JOAfVaCGesxvo/VsBhgKJ3IDzWk/rAV9XMvPtmPUw7gEmC3FfCV4EQrjo5CuhgsNPWEPK2rHqQFNWOiyQBBGUOTbjw5gIu4rxtocg//W+sPvBMKvzKXJKSzouQsXoiMEJzMKSEx0OQXmjzA/zoJej32DdYnvGLz9GVLy2SktmoSCALQifOsYQtL1rlg+r5B+UQwfw53dzOOPZso2nEC16UBAjljXolkY+VysCR4bBa5B/dtMxCX0Qpdst6YGPinp188a5BZX1S6wlq/NRkAR3Ce+l6amvixrlnGVm2U0bIayXrLxVAjYqDJsFI83urwdMxpnlH+o3bv6UclVR8GwlXmO2fUvE/g/WGcJwG3VfwfeW39pYdUeeAAAAAASUVORK5CYII=",
        blank: true
      };
      engineList.video[7] = {
        name: "niconico",
        url: "http://www.nicovideo.jp/search/%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAASUlEQVQ4jWNgoCYwMTH5b2Ji8p9ceZwKidZIsY2kYhQDSAW0MYAUg8h2AbJltA8DWGiTZQB6lJHlApK8QFFCghlCMMmSoZYgAAAvUMVwhox/egAAAABJRU5ErkJggg=="
      };
      engineList.video[8] = {
        name: "爱奇艺",
        url: "http://so.iqiyi.com/so/q_%s",
        favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIABLAQAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAARJJREFUeJylk71KxFAQhb8bw7IKgbW0sxUuiPgA2ttsodhaLOwDiBDyALKNnYWBFJYiKttspUhaQRAh4GMoBDSkuRZOdHTDkrgHBs6dnzNT3ANzwkSJXQUOgPVuJ+gDFGVe29ztBEh9DDwD5z7wBPT+Nr5/5BOdW1oMdtSzL7Hly/Db8SBbbnN6lNhXYLvNTC1MGFsHHAJrwEDVJsA9cCKbUrWx4qmnBlYARsPMzFh4JPENX5Q2G1x7BewKv6uSnpzTBBeKn2mBX3DO1V4zGmbXdXxKoC2mBE5v9h/nUnx4udwLY+vC2N426TdRYh3//4k9UxH4MQsw0wvKbKkPbCBu5MsgFGWOt4A2D0WZ6wVjxI2fleZQvCOg+1AAAAAASUVORK5CYII="
      };
      engineList.video[9] = {
        name: "樱花动漫",
        url: "http://www.imomoe.in/search.asp?searchword=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAEZElEQVRIibVVTW9bRRQ9d2bee67tOk7qxq4TxaUJqdSQQJWqEKhAFMQCsWGDkMqKBUj8BPbwDxCb/gBYABUIgfgopQJRaNoqrUpImtAkrfPV1E6cOLHfm5mL3nPjJCQVYtErzeLd++bMveeeO4NHaRRiM/OuI0zov7sCXgtAvW0QQkCPLcJeno3+JleBOlMkT+ahlNq1n4j2BvfnKtBfjTGv1IDAQuZT4L6DRL/dZerLkMgkYJd9mMkl5koNzgtHyD1+6L/B/RsL0J/eZHEiB3mqQORJmPNTbH/8G+qdQVJPZBubAFgAwfV5mHN/sTx9mNxTh5uxEByb4OHyZ5ax9v73XLtahH3gC5dmxtqHF9gfmY2+rTWwxmztW1hF5YOf2J8uN32hiSbHzAg+/5PVS2GJ+WYGoUkAzpv9RNlko7pKDf5avRlX7Uk4AznwH3d38NvshLm+ACaCc/rIDuCofGNAXSmECdVG5hHUNbwns804P0hOFNK0JzgmSyw6UjtAQ8UEMyWILybY74iDYgpyogzqSoNv3IN+q5+Ep6AvFyEvzcIOdbIJNElH7aQFnSni+9WoSU3wuQpqw0XWCQlnWUPULEShBV7CIXVtAXp0ERvL69BXiiwHc0BxFfWPh1lX/UZTNxsahFl+dIkVC/BQJzmDeZjx+7BfjrN+Jkuy7DPtj5HxCGq0zDrtIkhJ2ne8E6o1DhIUJeafvcpocRF/o5/EJmf221uQJMGh9CZLUWM444Et4I2U2LTEyGz4LGfXWBeShKRLsZElFqNLEKKh6ajxr/USL1S3OA9uLkBfm2P33RMk2+JwQt98BXpsCTjWCpuJE+93ocaWQFaACy1whudZVjTMRIntqQJt8ivTMYiEswXOt0ssBtqh2uJNpYTKYM2w7XFSmqFu3GPuayfjyShFczJHwWSZkYqRqAcQXgMQgYExZguc4h7RRtDUqK0HCAcslJ+8OMPu9CpsPgndxRCrdfD9DdaSQIcSJB/PwJ9aBhXSkDEHQbECWNoG3t0Gc/52xH3oJingtCfg5FIwt8pkYor9nlZyRxbZ5BKw5RrkwQTks4fhCQFkt+n99yKrrobeI6pkIQ1iC3N1tiEhJSGEjILq1V7Qmf5Gx5Z98NIG+Ggbua90E12eQ+27W9E8hEqpX5gCL65DPV/YyjwEcV58jPxPrjMV0qQOxJtD5H8zzs5gnhIDeZjeDKmqD9nRAgWCn3KAH2ZZz1VhjAZXNNwzAyTjzk6dhyXVf52G/WWanZe7iTJxmJ+nmcsbcN87ScKR2Mvqn91kXqlDPN1B8mgGUjX+C2/F5viHp3jPFeCnXNIXZ9gKQGiG6DkAeghwNB93KsBQB7l92V3xPR+LkD+uBbCOQHD2CjtDBVIDO+9xW6nDnBtlUw3gvf0UyU0pbgI/7CXabv7YPQRfjzNy+6GySQoHwJTWOWysaIvBff0YSe9/PHP/Lt1UazDDc8BKnaMZT+8j2XMAIpvcdvPtBn90BuAfCZ4kdEzEwCkAAAAASUVORK5CYII=",
        gbk: "true",
        disable: true
      };
      engineList.music = [];
      engineList.music[0] = {
        name: "网易音乐",
        url: "http://music.163.com/#/search/m/?s=%s",
        favicon: "data:image/svg+xml,%3Csvg t='1666873073102' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='14673' width='200' height='200'%3E%3Cpath d='M604.71296 63.911253c-53.548373 19.667627-95.06816 77.038933-95.06816 132.222293 0 16.390827 3.822933 43.165013 8.741547 59.55584 4.911787 16.390827 7.645867 30.59712 6.557013 31.143253-0.546133 1.092267-18.03264 9.28768-38.792533 18.57536-72.669867 33.3312-124.576427 101.07904-134.956373 176.479573-18.029227 126.76096 60.101973 230.57408 173.202773 230.57408 72.666453 0 134.95296-43.165013 160.631467-110.36672 16.940373-45.89568 11.47904-104.905387-20.21376-204.89216-8.192-25.678507 54.64064 9.28768 95.617707 54.091093 50.26816 54.637227 68.297387 135.502507 46.987947 214.17984-19.124907 69.389653-77.03552 136.598187-146.428587 168.28416-184.674987 84.691627-385.737387-11.472213-440.920747-210.899627-20.763307-74.8544-13.66016-145.33632 22.401707-222.921387 27.86304-60.101973 86.326613-120.203947 146.97472-150.254933 48.626347-24.040107 58.463573-32.23552 62.83264-52.452693 3.826347-18.57536-8.741547-45.89568-25.678507-55.18336-36.061867-19.67104-118.019413 21.30944-192.8704 96.160427-68.84352 68.84352-101.625173 128.39936-119.657813 216.91392-38.792533 187.948373 57.91744 387.92192 227.84 470.429013 61.740373 30.59712 112.551253 42.06592 182.490453 42.06592 154.077867 0 289.57696-78.67392 355.689813-206.527147 32.781653-62.83264 40.977067-100.532907 37.700267-175.93344-2.73408-72.123733-10.92608-102.720853-40.98048-152.439467-49.718613-82.50368-134.406827-142.05952-216.364373-152.9856l-27.316907-3.280213-9.84064-32.781653c-13.653333-45.349547-12.56448-60.101973 4.37248-73.212587 18.029227-14.206293 37.700267-14.752427 62.286507-1.092267 46.441813 26.22464 54.64064 28.409173 73.216 22.398293 19.124907-6.007467 36.05504-30.047573 36.05504-51.357013 0-19.67104-26.76736-48.080213-63.924907-66.112853C696.507733 55.169707 639.68256 50.797227 604.71296 63.911253zM574.65856 460.032c19.12832 71.031467 20.76672 91.245227 9.291093 113.646933-18.57536 34.966187-72.666453 46.987947-99.44064 21.85216-22.401707-20.759893-29.50144-39.8848-29.50144-78.677333 0-40.434347 10.92608-67.20512 36.604587-90.699093 18.578773-17.483093 57.91744-38.2464 62.28992-33.327787C555.54048 395.014827 564.82816 425.065813 574.65856 460.032z' p-id='14674' fill='%23d81e06'%3E%3C/path%3E%3C/svg%3E"
      };
      engineList.music[1] = {
        name: "QQ音乐",
        url: "https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADMklEQVQ4jY2TbVATdADG/3cBDgkNN2QyZWMhoKQwtLIyQ/DgaPvAAUVddUjU2UUdd3Z1vmR2B3VxUWhJqyBS0vAlDo7VImCWsPM4KcC0BtgYgzFjzcmY42Uovz7lnZ3n+Xx+fs+X53mEuDvJ1E+G7L5LrwjaqFmed6D8ibqaU6mdpd8s78ozLrny6M7FvUKIkDuSccrwRyy/Vg14ffUcdmt56aKcp87cR/a3S9C3rsHavcG2Pl6ScVtYs06ePePpmMXXQs/km1Q4tlDQJiOrPpw3GlR4/9JyfSwd34UH5rc8GPL0LXBoqFh11WmYXPC1sHC1lsnxfZRZNLzbloitL4fZoXwCl3TMDaXjP6/hsil6WhouEm8GfFyeU7vgbeaG+3OuT1Qwb99J9wUdr55O4FJvJtO/a/H3Z+HvS2OqW4PHFEPNW6GN//GLPMOHfPOuagLj+wmM7WFmoJhr/fkc6XmMyva1TJ3NwNuVxuSZzXg6NLgMSuwnlwaEEBFCtjQ4dW78IHP2t5m1ljBj3YH/z2K85ixGTI+zz6yh58dU3MZNuL5/iImmZJzHVYwfW4YySqQLdYxk2/TQbvyWHfgtz+MfLGDGVsKVjnRchof5uXUD77UmcPmUBufxZBxHkxitUzJaKyVJIfKFTBa80XtuO96eAqb6c7k2kIt/5FncYyX8NFDE4T+0lJoTaWuIY/TrNYzUxGOrXsXwp1JipGKbEEJI7E1b/f+0Z+ExZ+I9r8PhLmLM/xpn/36R0l+SeO6HFbx+MhLbF3EM69VYDyqwVETMCyGkQggh3i9eWe/Qr8ZaqeBcUwodzjw6HTmcHtFR99tm8uojyPwqlL4aJbYvVQx/puDQC2EtN2uUSIT6YlWsz/aRgoY6OYVGBbvaV3PAnMIHpiT2t8ZR0hzJ4LFYRo+qGNSvmI0IE+tuGVOqOiTXUrky0FUVRXbtYtKqF6HV38srJ+Tsao+m2RTLhDEBR+P9N9LWBxfeds7qqKCMznfk9u8+jOSZcglby4LY/kkYBoMSl2kt/UdUzmT1Pbo7HkoIIdkUH1xYWbTsRMteea+xLLqvujSyMT1F8rIQIuz/5n8BdBDOUVi5DnwAAAAASUVORK5CYII=",
        blank: true
      };
      engineList.music[2] = {
        name: "百度音乐",
        url: "http://music.baidu.com/search?ie=utf-8&oe=utf-8&key=%s",
        favicon: icon.baidu
      };
      engineList.music[3] = {
        name: "酷我音乐",
        url: "http://sou.kuwo.cn/ws/NSearch?type=all&key=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+klEQVR4nIWTX2hbZRiHn++ck3OapMu2oG3WCm2XUJm4zihK/TN0rQ6ZcxsIq0w6hG0XE/FC2BgqInhR6o0yN8U/IBYVp2PMC91VsReheFFdt27FaknDTE66Lmt7mpwkPfnO+byoE4SpD7zwXvze5+blB7fHiIRI73iw5dt3j6VVsi06BMRvFxS3FguSsfbkwY6e3hMnDwVmulOCUiA0KtLk/E8uJ89dreSn7ONLS5XPgSqACMGRF0798LEZshBizahpgtL8NOXJT7lu6Ow48DC6JlBK8fuSjVSSX94fr9gTpVbx/ScDas4J8dFsN4mOu0ktXGAwUuCeWAiEABTvTBYYv78ZLR7FX3SIZRyG97Wz642f3zKK+TyHn01xcKdL11NH2PV4C6m4jywBmgaGzqHWEOZUmWq1yNCJJ2FwMyISJf/iKEbY0nNApykX6dqzjYmnU5z5epL9hkvLepOzWZ/hvRt4rfcBRDRG/dI4ZGeIPDNAADnt1zknACDwUIDrChK772PE02lrD3Hm9UfZ5DvUM6P4dhb5h00jW8DPfQEgtc/OZ69lphbXXqEU0pfkl4uUPAcME2FZEAQoT1IbG0cWlolslyjnKgIKxvbWcD294LHz5QzFVsFN2wPF2ug6wrLwb7oE5TrBimTd/m6EkUcYHehctjXpB/PeDZcvewRqxiC4VEYFCsVfAl3SmHNpXLHw7WacD4vI5W0IazMCPO3OqJlrVMuslivITX2Et5ymacyiMl2G1d9QCyMEhSj4ArP7DpSrWDk1hQgnWYWc8cGEPXRvk/tqX3s45q9cp27PQ/Io4doIhjmLaEoAywBsONyDMjeCFuWr72ZXAAzAeynjrO9vq42qhOpTgYQgIGhK4AcFhNVFaKuNqjYQVhcT06Xgkd1vvyLh9C0BAKO216/b556LpB47q4XXrfVAb0ZYncSPprk2X2NLeuibG05t4F8K+DfN8YeeX2p5YlCNvdevnItvqt6td80A5v8d/gMdhg340YLUf+X+BAnLRacR4gVKAAAAAElFTkSuQmCC",
        blank: true
      };
      engineList.music[4] = {
        name: "5sing",
        url: "http://search.5sing.kugou.com/?keyword=%s",
        favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIAByAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAjlJREFUeJytkz9oU1EUxn8v7zW5xNekhSL+QxoUmmBxUozRxcUOgg2pgkJxrWBBqh0cdROqg5BBBaeKgkIIIkLawUFsaoUsUtLaDKUNVklKQhrb25j3rkNfYqx2EDxwl3PP9333fPccjW0RTZhngT4gAoScdBaYAlLJWHWitV5rAXYDw8CQEMI0dB2XSwfAti3qloWUsgo8AuLJWHWxVbU7mjDHL73pUlcm96lsKa1sZau6XWsey64rW9lq5utrFU2Y444ghsMxLIQY9Lg97NkVoMd/AltZfC7PUJR5iht5ANatCvOlaYQQg1LKb8Co4fQ85G5zA3B893k0TWMsc5m5Unq7RQC429xIKYeiCXPCBfQJIUxN27Kju72XwsbyjmAATdMQQphAnwFEDF1vXgY7IqzXK/QHRpq5oswzX0pTlPlmzsFEDCDUcBvAa/jwGj6igRt/KM+XP3A3cwGg8UMhY3vRs9xtVjfyFGWepbVZvIaPYOdJ+gMjBDvDnNp7kfcrL3+9BMjathXW9S2uyaUnvxGu1ytkCimW1mYZi6TpEgeArdkAsi5gqm5ZOxrWiKu9caeNaQAczJQLSEkpq0qpvwIHDt3i8Zkch/3HeLX4gLlSGqVUYypTGkA0Yd4TQtz0uD0cbD9CT0eY/sB1vIYfl6bz5XuO5wt3+LT6FoDN2iZSyvvJWHW0YWL82tGH507vHwg2lJercyyUP/Ju5QWZQgoApRS1HzWklE+BOPyHZWoStBD90zr/BDWFAshUlB4uAAAAAElFTkSuQmCC",
        blank: true
      };
      engineList.music[5] = {
        name: "一听",
        url: "http://so.1ting.com/all.do?q=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABfUlEQVQ4jZ2RTUsCURiF/SFton27qIgoQ9skidJSF5qu2gZRtGrVan6ABJGbIqiwDz9CLSINIceKcNOoV8MpxQ9EJ2uc62nTiJUj6gt3c7nnOec9V6VSGIZQ2GLCr8MQCqX3LRFDKKysAFNUgNrLY8qdwehJEqtsCSvPn8oQhlAsP9RhZQXog1lo3ElMul7o4mEcW4EkVTufsBHNw3xXqCsCxvcib/pgFjofgeaCYMyVwOZ1Gh5SARN9h9aTgtafgzlSFjtC1mJFwXCZxtwpRydcCcyfc9RDKqh+iZQXREiSRPEzhrM4/y+BMyvilq/iOFXBAVfG33ks1sEQCoOPK3RuPZzDbqbWcmo0RAoAktSgTQByyYod2MI52G9e8UGbLddwsYH7ktjbF8oAOYHsyBCKnRp6AwSyVcjiroJOAIZQHJHKYIB2SDtAvlvaduz3DLGwQmt3Y6iMoXWHt+8kFlbAwlUes/48RmZ09r7XkUHGUBnD01rTQAAZ0q3Qb/EHnAbFqFNRAAAAAElFTkSuQmCC"
      };
      engineList.image = [];
      engineList.image[0] = {
        name: "百度图片",
        url: "http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=%s",
        favicon: icon.baidu
      };
      engineList.image[1] = {
        name: "谷歌图片",
        url: "https://www.google.com/search?q=%s&tbm=isch",
        favicon: icon.google
      };
      engineList.image[2] = {
        name: "必应图片",
        url: "https://www.bing.com/images/search?q=%s",
        favicon: icon.bing
      };
      engineList.image[3] = {
        name: "pixiv",
        url: "http://www.pixiv.net/search.php?word=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACaElEQVQ4jY2TS0iUYRSGjwupXYsIAqFdDl13tclNd6WgZVQULZrB6ddsbhA1FwkyNQOjCMz805nxMiM6ajq/OkjZxQElLS0sK6NQI7QkCCrTnhbfmBMatXj54PDxfO97zvlERERM245IlqbLXut/StNlj7VM0kzbRdZlHBVfJ+LtQDzGgtwGci6KuKN/1ueVH0Nc9bMi+3KD4u1AnGHEHkK0IHIyiNhDLD/TQIozrGpaEHGE1D1nGHGGEF8nIpnZt8QdRaxBUh0hDvl70HtHaR4ao/XZBLHn72kcHONwoAc5XYucqkFcCYjHQGSHRRdXC8eCcQbHp3kwOsnxQBxTQRurPBHSL7Ria3jE568zdL/6wGp3REHmASv3a3rkxRTfZ+cAWHsxipyoVK/Z69RpriK9oI0fcz/pH/vEMkdIxfUYSHlFhd40Mo29aQCATZc6kNyapKxhZdlchaPlMQCW+j7EGkg0s+SqnlZ8F0u4D4DNJUsAnGEkt4b1RQYAxvAEolWrCaVmaXqKsxlngv5XQF4taedvA9D39iOSV6sAssuiiy2C618ArZqtpTEA6p+8U2N1RxHZa9XF3vQbsKG4fTHAFkLMVfj73gCQVd6tIniMxYAtpTE1BWtAKduP5FTjbR8C4Nr9l0hOddIeJAD2ZjWFh6OTlPe8xmcMYWse4HLXMIPj00x9+YYt0q/c2euSAJnZlckOdl6/w4GybrztT7lyb4TCrmEO+uOsONuoHCWvswJoleJsxZFwYCoyEHPVQgRrQOW11S1ubH4MkTUbd4tWM1MYnwAg42Yv4mpZ+gcmyxdDrDcmfgF4QGAxnLBCrgAAAABJRU5ErkJggg=="
      };
      engineList.image[4] = {
        name: "flickr",
        url: "http://www.flickr.com/search/?q=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA+klEQVQ4jWNgGAUIIKBqwKCfUMSgGZXJwCklhy6twSCoW8BpUZTFaZIjz8CviCprXtbFkHX3PxynXPrGoBIQC5Ou57Fv/C/Z+B+Gf4jV/szgMs6EyMq7BqJoRjaEQ1zRmUXRFVkzsiEaDIK6DAwuE1ZgNSDr7n8Gvbj8Wfy+c7AZ8F+y8X8tl30dA4PrlNU4DdBPKFrCH7QUlwGNPE4tDAzqoclYNaff+MMgoGoQwaYdhcsAGxY5G0g4eExZh2GAUVY1LBCX8wevQNfcyevShRoTim4hDHZNMxls6yczSJjao0ejP5ta4Axe35mT+DwnO7MoupKfXoYfAABPvsL2GuU3QwAAAABJRU5ErkJggg=="
      };
      engineList.image[5] = {
        name: "花瓣",
        url: "http://huaban.com/search/?q=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC1klEQVQ4jYXOyU+TeQDG8Z//gIkxXogxXky8TTIeRhMzcSEdoKW0SIFibYuJLFbZVGyxlLbQFoqoBEhEBSlbA4xxNwq9zMXMeTLO0b4vWOhGoSKBUfHrAZdEEZ/kOT6fPMJtNLVPelpD92yNobv1ttCd2vNTI5aqhx0lxpv6/ftNO3fs2LN7+/a95Qd/r75VZBgPGsyTE0ZzaMJ4MvTQXBYSU772v/nrOdx/zIeJe6wF/+Td4CjvAqOsdl/n3xNlqf+Kjellh4dVfycrrVdY8XWw2noFOnoQD5yuEE8mWQyOsxAYJdU3SKovQMJ/lZmSUiK5OiI5Bcg5BUQqqom7fcScXuJOL288lzcAAsMkr/UwXVyKpMxHyitEUuqQFBrCmbnMmMqIubzEXb4NgMEgqdtDRMqr10d5RV+BrHwkhYaXh3OYKa0g0dxG2uNHjDU0PvoCjIwT93Uga/TIGv33wB9awpkqXh5Rkqi5iORoeSM6LZbedWCCheExIpZzSOpiZE3JxoBCTfhwNvPHDIwbzCGhP3TItPb4GYtjd0jdHGDGVI6k0W8OZOaSVORxYd9vzSJj27Zd8sDwwsrdB8z33GBaX4qsPf7zBwUGBtX5j4QQQnRVWvp5OkWy6zrTRSbk/E2AI0qkbC3Js+d5cbomKYQQYndGxt7ZoZH0cm8/8o8AhYbwURWyupDZs+eIXbATr7UiPqcsW3Xmfd8QEZ0RSV2EpCokrDy23iwtsqqQV+YK5i46mLM6iNbZWKyzfQWEEMKr03WtNraQqKonUlnDq/IqIqdrma21ErO7ibl8RC+5mau3E62zkf4WEEJsadLrfcuBEd4ODJPq7iVxtZuE/xrxFj8xRwvRBuemgBBCiKxfftU+t7v++b+3n7c9N0i3dzLf3Ea8yUOswUm03k6szsbrHwGfsrX4wMGTwVOVT144XHPznnaWmttYcnp5bXezZG1izdrER/CEaFr9QFrRAAAAAElFTkSuQmCC"
      };
      engineList.image[6] = {
        name: "Pinterest",
        url: "https://www.pinterest.com/search/pins/?q=%s&rs=typed&term_meta",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACD0lEQVR4nO1WsW4UMRB9sxsECAmlpbrbRKwpKE4nk0i0/AQSogGlSInID/ABKegoEimioCC/kJYiySKCkE7aC8rtUdKgSClQyHlSBN95N/batyQVN5U9nnnvzazXNjCz/92oSVKWiPcAnlfcR3KQL16rgCwRHBKn1Ki7NPz+5coEhBJXTQ5yL350XeShubUKnQDMZ7Lo3zBdH4F4IRFntvC6TjgXsnb6B0Rz04CNcy3CXXluARWQW7fjmw97vVPXesSq0y0OvzpFUNySR70fVR7rHthPxK+qT5NnbbFhq1BRdGD6L1XMo6GNyyqAgHlzrsE+L6RPQHhpy9GWJWL8+7HCal2sU0DJmD9MhrRzMcCxHOTk+K4dPXg0zN+VxLXFrldAlqRb5lwW/WcAkLXSBxNfPj8OUPzKV8PYCEteAcz01Joc4a0dlN4EC7DCVvGA39ZIxje7ANy9UgEAts3Jbut+BwBk0V/7F6JgAbLIV8x5HEWTXQ1+7QM0N+Z+kp6UFhl7XgE20/83gdZNv+6Oywh0pySuyJeDBDDjp0vESMX3tG95eHgwyeFTs/rQSyz4KNYWchfsLYrHkcKnMtMURzFwUVEdietIzhLBl8gB2MiBBtex7sA074S6rtVuwmqiryvTknsFWADWnYENyIMEaCA5yIn+/h2+9is16oaQA02f5e10E0QvKu5Gz/KZzewcjEjYbJKZwQoAAAAASUVORK5CYII="
      };
      engineList.image[7] = {
        name: "Yandex",
        url: "https://yandex.com/images/search?from=tabbar&text=%s",
        favicon: "data:image/svg+xml,%3Csvg t='1666872628734' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='10516' width='200' height='200'%3E%3Cpath d='M451 1024V691.8L229 96h111.6l163.6 459.4L692.4 0h102.6L553.6 695.6V1024h-102.6z' p-id='10517' fill='%23FC401D'%3E%3C/path%3E%3C/svg%3E"
      };
      engineList.download = [];
      engineList.download[0] = {
        name: "海盗湾",
        url: "https://thepiratebay.org/search/%s",
        favicon: "data:image/jpeg;base64,AAABAAEAEBAAAAAAIAA2AgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgCAAAAkJFoNgAAAf1JREFUeJx9kj9r8nAQxy8xLQatGmPtIoiigoKCoAZHyeQutEtBHHRpl7yELq6+AP+8AIcWOxURQRzMIDhEyeLilIKDQYUg+eWeIT48VujzWe4Ovtzd9zgKEeEvl/kVFEXZCWMHVVUlSTIMg6bpK6ndpV6vPz4+nmtE7Pf7v/W2qVQqtvI8gWHOyc3NDSGE4zhCyH6/BwDLshDx9vbWFvxYIJ1Oz+fz5+fnXq8ny3KtVnt/f282m5f2mMtFWZblef50Or2+vjqdTtM0X15eFEWx5/zzhIjtdtsuvV7v5cy7uzuHwwEAhULhdDoh4vVNdF0Ph8MulwsAEomEYRiEEAA4Ho9nD8vlUpIk0zTtToIg5PN5n88HAMViURAEjuMAIBgMMgxDCKHG43GpVHp7e3O73Q8PDxzHHQ4H0zTtVVmWpWmapulcLjcYDKbTKTMcDgFgPB5blhWJRDKZjCiKqVTKPvRut1utVqqqdrvdVquVTqepr6+vz89PRVEajcZiseh0OtvtNhAIxONxTdMMw4jFYqFQ6Pv7W9M0QgiFiJqmJZNJn88XjUbv7+89Hk8ikbAsS5ZlVVV5ns9msx8fH6IoVqtVQMT9fu/3+yVJ0nUdf6Lr+mQyeXp6AoDZbIaIgIimaY5Go+12i7+w2WzK5fJ6vUZE6j8vfQki2h/+B8UpLqpv9VygAAAAAElFTkSuQmCC"
      };
      engineList.download[1] = {
        name: "谷歌搜索",
        blank: true,
        url: "https://cse.google.com/?q=%s&newwindow=1&cx=006100883259189159113%3Atwgohm0sz8q",
        favicon: icon.google
      };
      engineList.download[2] = {
        name: "动漫花园",
        url: "https://share.dmhy.org/topics/list?keyword=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC1ElEQVR4nCXTyY7cRACA4b9c5a3tdi8z6e4JsygzTKJIcwJxyTPwfDwJnDjNBQgicCFESiRamSW9jt2r7barXBz43uETP02srSws04JD7tBUPv0RtHwAGC8tgxC+fyV4mMPNAMZryy9Lwd2TRu01VAeYTva8+e6YsoDbv1LiqMdun+HJkJeXHlHT8CJy+JxazjoOL2rBeC5QsxWkU8siaxjfafqx4OV1F7B0vA6ykdS1ZaYl/ZZhGCkeU83bj5pdblGzZcFwFHJ+McBRmnRnCbFIqSiNBXPAOIJ3D4ZAKk5VzqxUBL2Q/SJHbfca12wJByEEClNpssaQaUGaHohcwdmRywKXNKv48aHg8qsu89UWmgbneNgmLeHnX6fcTyzSkRS1x+0fcz5/qdkeJFFXIQr4+EmzLRLefdiQO22c0wRV19AKY6Ijh0KDdOH+3wkXF22+vW7DwfL7+wWLDBrj8eabFunGMF8tifMYB8ANBYd8QSM0xhquzk+oVw1uU+DFFiE6CNenn0ieJZrLkU9CyJFyUSjLdLzm9NmAr08UERWTnWCyXbOpz+j4lkHHkEQtzp9LTA1uy2KDkNqxqDKzXA18Li5CdjuN9jzu7kp6SUIImHXDsB3QTqB0DOVBMh8f2G+h7AWoOBBcn4ek2YFKeJCDFgIAzwKOZK/hyyMsVxnrrOLm9Qjh7OiXCnW/2PG87YGS1AZkY0iOFPapAqD2NL/9uSQXCa7oEokNw5Fks4tQyqB6wza3759wNLy+iYmkR7XLKfGQLpjG5eqqy9Oqpt2SXJ/3iY3huC/5NN6jAgkngx7T6YIo8FGqIokUs6xmU0CrbXl1EsDAASnAVJSVQgNRO8DphJZ+1wFASuh0PPbZmtNRl7d/PzDNGkoLbvh/z9z4PK5hNsnoJBLxwz/Wrraa+RPYpiA2UFiN348BeBznWEcTBz6HqqRxXOLQ5fTYJ+pI/gNDt17HeSMTvQAAAABJRU5ErkJggg=="
      };
      engineList.shopping = [];
      engineList.shopping[0] = {
        name: "淘宝",
        url: "http://s.taobao.com/search?q=%s",
        favicon: "data:image/svg+xml,%3Csvg t='1666880201701' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='32068' width='32' height='32'%3E%3Cpath d='M228.96 172.16a76.64 76.64 0 1 0 75.84 76.64 76.32 76.32 0 0 0-75.84-76.64zM317.76 535.52C307.52 458.24 160 360.48 160 360.48l-57.6 82.24s123.84 61.92 134.08 112S66.56 753.28 66.56 753.28l128 94.4s133.28-235.04 123.2-312.16z' fill='%23FE5100' p-id='32069'%3E%3C/path%3E%3Cpath d='M957.44 380.96c0-66.88-66.4-152.32-174.72-171.52s-263.04 60-286.88 64-30.56-3.52-30.56-3.52l27.2-53.12L400 178.56A416 416 0 0 1 355.04 288a425.28 425.28 0 0 1-74.72 92.64L338.08 432l76.32-90.88 50.88 5.12L372 464s3.36 39.52 32 41.28 72.96-67.04 72.96-67.04l52.48 10.4 1.76 68.64H360.16v46.24l169.6 5.12v145.92s-48.96 7.36-70.56-23.2-12.96-78.72-12.96-78.72L336 609.28s-6.88 84.64 22.56 126.88 90.24 57.12 152 51.84 215.84-70.72 215.84-70.72l10.08 46.4 81.44-37.76-49.12-130.4-66.24 13.76 6.88 56.64-81.6 36v-130.4L800 564.64v-48H624.8V448h168v-54.88H517.92l40.8-80A562.88 562.88 0 0 1 679.2 272c48-6.88 69.44-10.24 113.6 17.12a108.48 108.48 0 0 1 50.88 67.04v381.76a96 96 0 0 1-60.96 53.12c-48 16-124-1.6-124-1.6l-6.72 53.12s128 25.76 210.4-8.48 95.04-132.16 95.04-132.16z' fill='%23FE5100' p-id='32070'%3E%3C/path%3E%3C/svg%3E"
      };
      engineList.shopping[1] = {
        name: "京东",
        url: "http://search.jd.com/Search?keyword=%s&enc=utf-8",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACoElEQVQ4jZWTW0iTYRjHdxcUfrPZtq+cm25LxaQSQ4tO2IkKO1yEQVEERWJFYUQJQQUZUWQG0QGKIgoCS4pVBlKapH6fztNsW+zQZnOW5GGyxFkQvy4+LbUguvjxvu//efjxXDyvqmCaUFymFitKBf1/U6YWK1TlgljVMzsNt96qoLPi1lqUc/w+zng21tsjpqEqFfQVbr0VWWv+CykKsxSkhGQkjUl5a824ddYJglkpyDoLrRm5dK7Kx25dSEdOHq5NBQqbt9OxZA3Nxnm/hJMEUkIyTeJcfPuPEKmuwb11B+ErN4j5Aww73jHc6eRrcyufb96hMy8fSWPCNUmgMdE0O5Wuk2f51tODd08R/bYqYv4AwZLT+IqK6Xv0hNFQNwPPXvJu7RacmpQ/BcGSM8QCQTy7C+mrtBF5VUd71jIapou0ZuYSLr/G974+ui+U41Qb/y0YelOPY+k6GuMSaZwh4li5gahsZ8D2Ak/aov8QqA1IGhOtmbn0V9oYfFWLPydvikCcS/DE6b8LBANSvJH27BUMVFUz+LIa34KlYwKdhUbBgKyzEDp/mdGPITw799FfaWOo9i0dS9bQMF1PY9wcvHsPEgt00Xv7Hu7EdFSlgrbifVIGbVnL8OwuJCrbGXY4cW7cRv/T50Rlu7IDi1fjP3SMaEsbI14/nl37ccablAm6Vm/iy8PHjHj9jPj8dJ06R0t6NpHqGn6MfiPyuo6hunpGvH6iTS0Ejp3Ebp6PS2tRBMHl6wmXXeXT9dv4DhylJS0bSZPMh8PH6b37gM+37tF75z6hsxdx5RfQbMxA1pgmbKLWjKQ2IAkGpPgk5IRkZK0ZKT4JKS5RyQWD0jPT+Kvu1llRXRLEqrCYiktr+c3Yr5uUTam5dVbC+lR+AkXUXUZHV2HdAAAAAElFTkSuQmCC"
      };
      engineList.shopping[2] = {
        name: "苏宁",
        url: "http://search.suning.com/%s/",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABMUlEQVQ4ja1TQU7CQBR9xNWwpUTJNF0A4VCEhVvjBRo5AAR2pjHxAO0C40JMqXgDTfQE0mqiB8CFganxuTBtaKdFYvzJ28x/7/2Z/+cDJWFU0fBtzHwbgVFFo4xXGE0DndBBxAnICRg6iJoGOltFgy6GaxcqEZVh7UINuhhqBspD/Js4gfIQawa7ihNkxK062ptJy7I0Qf6sVUcbACAFzMUpwkLy9ICc7hcahA4iKWDi5gS3+Worr0I+nZH8Iklycc6VW9FudW3D1w0u9sj7Q2px1/vJbXB9GzNIATN08Jwm3q5IkpZlZUCSfL1MxZGDFylg6k38/EiLZsQkGb/rTdTG+HBEqqX+BLUkH4+Lx/gvH2nUw3gXE+UhHvUw3roXf1qmfNQEZNDHPOhjXhOQZbxvFy/H102X8MIAAAAASUVORK5CYII="
      };
      engineList.shopping[3] = {
        name: "亚马逊",
        url: "http://www.amazon.cn/s/ref=nb_sb_noss?field-keywords=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHklEQVQ4jY3QT0jTYRzH8a9d0m1M8rbMZklQbjRDOpSnHXSTjpFHvVgH0UODwShJWn8gGXXRi6Q1lIpfWYwCYZkQwWqHdhrYH/UwgxmzGU5sv7Hf3h3CJ3U5+sJzeL58ntfzfR4REbHZbPZgMHhL+8+ampp61Nvbe0lE9ondbj+SSqWW2VWRSIRAIED/wABjY2Osrq7ujhAOhyclFArd3d5cWFzE4XQiIjuWtbaWN3NzZYhMT08/39qUSiU6PB5EBLPFwp3hYYaGhqgxmRARvJ2d5YCmadrWxjAMfD4f7e3t3B8fVyG3242I4GppwTCMvYHtFYvFGBkd5bLPx2G7HRHhRHMzuq5XBpLJJGfb2tTbzRYLFqsVEaHZ4agM5PN5TrW2IiIcrK8nGo2ysbGB1+tFRHA4nZWBRCKhbvb7/Sp00uVSE1T8xA/xuAI6PB4ymQzjExOICFVVVVRXV/N6dnZvYD2X42hTk0JqzGZEhEMNDap3PXjzX0BJNeLxOG63mwN1dTQ2NnJ1cJB0Os2Fri4CgQCGnoO1edhcUcBT9Hn4dA8K6wrK/syhF4plb+b7W4hdhPc9CngGRfg8AjNnIHEF1j4Chb+HjCJsLsPSQ3h3HpK34cvoH6Cvr69fBX8kYO4cPDGBZoaXx+DVcXhRD5oVZk7DtwjoWeAX+XxeFxHZHw6HJ3fNCZnHsHQDFq7BygMwvu5IZLPZte7u7p7fLX31eStakCQAAAAASUVORK5CYII="
      };
      engineList.shopping[4] = {
        name: "天猫",
        url: "http://list.tmall.com/search_product.htm?q=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQElEQVQ4jWNgYGBg2MzA8J8czADTvIOB4f9+EvEOmCGbydAMwxgGEAtoZwA6RtdA0AujBgxLA4hOyhRlJkqzMwCOOAUjv7eE+gAAAABJRU5ErkJggg=="
      };
      engineList.shopping[5] = {
        name: "值得买",
        url: "http://search.smzdm.com/?c=home&s=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQElEQVR4nG2ST0iUURTFf+d9g2V/NKSgRYSriLCZ0jLie+Gi3LWqoKCFEYG0tHBTREgQSLWQCIRoWVCbKKKC/oD0fVGG5Iy2KDCiRQTBUBJh+vluC2dkHDurxzvvnnvuuU/U4H1X17ooy16Y2QAAUgfwEedWyawH6MknyefaGlc9FON4CFiH1C7nHkjaXEjTi5Juy+wm4Amhpej9rWUCRe+v5NO0L8qyu4uMdB3AYHZtFDVKinHunaBY8v7ZUgdmW8e7uppcLre/ShgMAwh2T2fZDzNLK9RQMBsoen8EwI3v3dsm6eDOkZGfYX7+PmZfgIvAyep0SI8Nphe7Sq8E3QDORdFEzUgHkFqBAUEGQAinsxD6CknSXDs7Zm8n4vhQNcQ/1CGfJKtL3hvSnpw0Vs8bDJnU7xbyUnfJ+zMG56sPJuN4s8FVpBOSNtYLSFpj0OkW3Nh34FqUZcOYXV45O9scYFAhTLlyeYXB14rtl0tEwDmgAEwBtL15U0Y6t2V0dBrp2Bw8DC0tf4EblZrbdUYm3fYkmay3V/T+iEGIzDKDe4LBUhzPVbJRPkkEFAL0C6DkvVVquw0OyyyYtB44YHB8R5I8Le7bd4oQLlXzMLOZQpo2OgBXLq+oJNvuzO4ibSokyVGg18GTkvcms5s1YfZGudyGSg4L+NTZ2TTT0PArnySqcbR0dWa/JZ2dC+FRx+vX35YIVFHyfgJoq7u+Y/ABswuFNG2s28T/UfL+gZm1CrYBz2dnZg7vGhtb9uH+Affd7MpRvsLpAAAAAElFTkSuQmCC",
        blank: true
      };
      engineList.shopping[6] = {
        name: "当当网",
        url: "http://search.dangdang.com/?key=%s",
        favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIADzAQAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAbpJREFUeJylk0ssXGEUx39zZ+a2g1QX7DxjMwzKJF2IR0iEWIxlV6KZeGQaEhZWbHRTsVCPJq5IG48IiYiFErZNmngUCYmgqGBFMljWq2Nx6l7XXAvxT76c73z/c/7fOd/DBhDyuqcAH0/Dd9vqVrmiJ794CZ29Bp2TB/NrYgHiEqBLA5frLsIX8rqnFH3nji9QUATdfULn5oOqQkys+K2fIL/Q4P+LKPq0vgaWF6EhIL7TKVZVxVZXwMoS1L439WELed0h3XM64eoKJqYhOcWI2tyAto/we0v4e1BMXm0drGxK8p89aGmCo0NI9cDwuLTwAEYFJWXQ9hnOzyDgh51tI8qTCdo3iIyCdz7Y27UQcDjg+jpsBx2JSTA5C1oPfNUsBHLy5OQf4uYfHOzD5DjM/YCICCh4q9MOfdalSRVWmJsRgZNj8GSYKCOj8QNkZllUcAOnQVDsEBcPZ6ePCMz/lPEY0tIh+jV0tpuWjWssLoVfG7CwLmXePSCXC95kw8AYXF7CyKBJwDhEd5qM5law2+HiLwSD8pRVVZIDflhbDRMI/4mVVeCvgVfR0v9AP4wOWzU2ZIPnfedbccyGGmWXmM8AAAAASUVORK5CYII=",
        blank: true
      };
      engineList.shopping[7] = {
        name: "1688",
        url: "https://s.1688.com/selloffer/offer_search.htm?keywords=%s",
        favicon: "data:image/ico;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAQAEAAAAAAAAAAAAAAAEAAAAAAAAICBAAAIiMAABwiAAATEwABIz4AAx0+AAAyMwAGChIADBQiAAAnKwALEh4ACBYWAAAwMgANGjMACAwQAAwYKgABHyAAAwsLAAEzPgABKz4ADh47AAE7OwAMEBYABgwMAAYIDAAHIz4AACwsAAAkJgABFxcAASc+AAcfPgABNTcAAQ8RAA8XJwARGCQADhIWAAsbNwANDxQAEBwwAAA3OwABLz4ABis+AAU7PgAGJz4ABRYWAAYPEAAPHTcABTc+AAUvPgACBgYAACAiAAQjPgACID4AACouAAAqLAAKDhQAEBosAAAMDgAEMz4ACx0+AAE7PgAMEBoABgwOAAoKCgAALjAABCYoAAQnPgABNz4ABT4+AAQNDgAMID4AAT4+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AQUREREQqQxIoKDApKysZGT5HR0dHRzw8QxIoExMdBBkUIEdHR0dHPDxDEigTEx0rOzsYBkdHR0dHPEMSEhMTKTs7HjgnR0dHR0c8QxISKCk7OzsNFUdHR0dHRzxDQxIwOzs7DTEAESA5MQM8PENDEjs7Ozs7RUdHR0dHIBwcPBIoOzs7OztFR0dHR0cDRzxDEyg7Ozs7DkdHR0dHR0dHPB0TKDs7Oz8BR0dHR0dHR0QdHRMoGTs7OyERG0dHR0dEBAQdEygTOzs7OzshGBwfRDQEBB0TKBIdOzs7OzseLggFNAQEHRMoKBITOzs7Ozs7BQU0BAQdExMoEkNDKTs7OwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
        blank: true,
        gbk: true
      };
      engineList.translate = [];
      engineList.translate[0] = {
        name: "百度翻译",
        url: "http://fanyi.baidu.com/#auto/zh/%s",
        favicon: "data:image/svg+xml,%3Csvg t='1666877034366' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='29943' width='32' height='32'%3E%3Cpath d='M938.666667 981.333333c-17.066667 0-29.866667-8.533333-38.4-25.6l-59.733334-119.466666h-277.333333l-59.733333 119.466666c-8.533333 21.333333-34.133333 29.866667-55.466667 17.066667-25.6-8.533333-34.133333-34.133333-21.333333-51.2l72.533333-140.8 145.066667-290.133333c12.8-21.333333 34.133333-38.4 59.733333-38.4s46.933333 12.8 59.733333 38.4l145.066667 290.133333 72.533333 140.8c8.533333 21.333333 0 46.933333-17.066666 55.466667-12.8 4.266667-17.066667 4.266667-25.6 4.266666z m-332.8-226.133333h192l-98.133334-192-93.866666 192zM85.333333 844.8c-17.066667 0-29.866667-8.533333-38.4-25.6-8.533333-21.333333 0-46.933333 21.333334-55.466667 93.866667-46.933333 179.2-110.933333 247.466666-187.733333-46.933333-64-85.333333-128-110.933333-192-8.533333-21.333333 4.266667-46.933333 25.6-55.466667 21.333333-8.533333 46.933333 4.266667 55.466667 25.6 21.333333 51.2 46.933333 102.4 81.066666 149.333334 59.733333-85.333333 102.4-179.2 128-281.6H85.333333c-25.6 0-42.666667-17.066667-42.666666-42.666667s17.066667-42.666667 42.666666-42.666667h243.2V85.333333c0-25.6 17.066667-42.666667 42.666667-42.666666s42.666667 17.066667 42.666667 42.666666v51.2h238.933333c25.6 0 42.666667 17.066667 42.666667 42.666667s-17.066667 42.666667-42.666667 42.666667h-68.266667c-25.6 128-85.333333 247.466667-162.133333 349.866666l25.6 25.6c17.066667 17.066667 17.066667 42.666667 0 59.733334-17.066667 17.066667-42.666667 17.066667-59.733333 0l-17.066667-17.066667c-72.533333 81.066667-162.133333 149.333333-264.533333 200.533333-8.533333 0-17.066667 4.266667-21.333334 4.266667z' p-id='29944' fill='%231296db'%3E%3C/path%3E%3C/svg%3E"
      };
      engineList.translate[1] = {
        name: "谷歌翻译",
        url: "https://translate.google.com/?q=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC/UlEQVQ4jYWTT0ybdRyH34MH4wVjovG2ZIl60IMXNTgoDtlG/wAy49bt4r+8XSFm2SZGox6WWNnal45SbKAbygKbShAT38yMNC9LMGyQsS5OdGtpOwqNvNkLLbwv76+KJns8lES9jG/yXJ98kidf6bGn6vY42tWEo/2SVutXtZotHEcT2o5q33vSdlfbpk68OQSH4uCNw8F+ONAPhwbhlQ9mbkuS9NADBY72S1e8cXg9ItgfEbR2bxH5k5aw+PuRJ5994YGCGr+qeePQ2i1whQRuReAMCZq6BC0992k6+nVCfuetE7J8pEOW5Q6fz/e+LMsdbW1tH7pcrgNSjV/V3uiD5rAgNr7BzB2TyzdM3u63aThVxjcgSGcKCNvCtm0sy8I0TWzbZm1tDellv6o1RSE2bpGcX+fjbzcIjG1w+AvBvqDApQhGxlMsZNOsrhgY9+6h6zq6rmNZFlL1EVVr7oXrKZOOCzbeXpvLSZPxpIl81sYR+IPPLi6RufMr0aERpm/ewiwV0fXlyoJqn6p5eiBx02RgwmJfUBBSLQr6Ov4vbeo7NzkYXiZ6foxPzvQRHvyGyPAo/SM/kM0vVQTNUfCds5lNrzM5ZzKT+lfmCpVxKwLl/E9cvXaNxORVOuNDpLM5VovFimB/DPaeFnh7BSe/2+D4sE1jsFLDrQj2hjY53jdHOP4VysAFrkxNoy//TqlUQnrRp2qtMfB0CRqDgvrPBQ2dW0lDNq5QpYbcV+IjJc6xUz2kUmmWFhcxDAOp2p+YqgjKeLrKuJXKZNcWzpCNMyioD6wTvTjFqPojp88NM/fbbVYMA+kZd6C7JQaeHvBEwNN9H/d/cHZt0qiUcXT+RXB0maVcmu/HNSanr7OyYiBJkvTwozt27a7aufvVqp21/+Pxp+uddd6xhYZ3b7Dr8BRnBn8ml02zcDdHLpdF13W2fbbnX2o/W/faBJ8GJpi79QvpdIr5+XkymQzF4ur2gqonnttzUkmSSmXJ5++Szy9SKBQwDIPZ2eTaP/p6Y/2tPjpQAAAAAElFTkSuQmCC"
      };
      engineList.translate[2] = {
        name: "有道词典",
        url: "http://dict.youdao.com/search?q=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4jWNgGFQggps34Y2i2v83imr/78gpvZdgYFBgYGBg8OXkCUMWx2sITOEbRbX/MAMYGBgEkMVxahZiYJCBKTonLX+fkDgG0GNlNYIpnCQsOh8mbsjCYgkTXy8uvR+nAcgK0/gECmDifpw8oTDxMgGhBpwGOLKzu8MU7peSOW/BweFgyMJimc4rUAQT9+TiCiDKC7gwUsBiBezIzoUFGrKr8GnGBgSQDYjg5k3Aq7pFSKTfgoPDwYKDwyGNT6CAZNtx+RuqWYCgAXfklN6jayTo7AEHAIjTnaHLaQtfAAAAAElFTkSuQmCC",
        blank: true
      };
      engineList.translate[3] = {
        name: "必应词典",
        url: "http://cn.bing.com/dict/search?q=%s",
        favicon: icon.bing
      };
      engineList.translate[4] = {
        name: "Forvo发音",
        url: "https://zh.forvo.com/search/%s",
        favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIAAAAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAcdJREFUeJyFkk9rE1EUxX/3pZMJxtCRuim01k03IkKJCI0E9Bu4VgxxpZaKurf+ofEDqHUhFCKKuuwHUCiKBgRL24WloVZd1KIVTFprMQ2d6yKZzEsZ07u6575zzpw7XCGi+gula6AjIIMAKNO+7lz/djM7v5srNugbL10R4X6UaVB/67XUzzunNwNsgubog7k3oB3FAMmk99sbmRxoMxguLp7vTu3LHvCSqGrjRXVKIA3+GaAMEHMSVL7MQCz+tW2FTLGswaC6scXC1aG21QDSjz44S7Oz28ZxQRVFN9cn8imTKZbzNjFKDDBz8Xhd3K4hmgkF2Q9gVBkNafqi0/7r9y7M2dgbfZwzIqRbct8872TQZH1qdTBsVHUnGBjRw3vrORS0AltGkJeW4+09DUTiITBPjHFrZ8NHerJPF3r/p+2+PPnextWJ3Lx5e+5YJRjE410sf/612l8o5XaL+8ZLrxJe7wlVv5lW7zbXaNSpZ8u6uLRK3IkR3hI1EVwrP9t/KtQ21qg+zAtYp7z2/UePLW6sa4sb33VTB1vitgRh1HcfReRI1D9Q1bGVsZMFexZ5dQO3phO+415CGVShDrxeuZGZiuL+A2DYnV2Yre6zAAAAAElFTkSuQmCC",
        blank: true
      };
      engineList.translate[5] = {
        name: "CNKI翻译",
        url: "http://dict.cnki.net/dict_result.aspx?searchword=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB3klEQVQ4jaXSMUhqURzH8YuBrSbiIIKIS4vo4ORQgyJCBg5Fuuqgsyh3tKFwUsjFycEIwq0lBMc7RLQFIl4RnLxXzqbe4Yp0v28I6vle+F70h99y4Hw45///S9SO+Ukkasf8XovFgkKhgCzLrFYrdtZXgBCCw8NDbDYbnU7n+4Cu67hcLlKpFEKI7wOPj4/Y7Xaen595eXmhUqmg6/r/AUIIQqEQBwcH5PN5HA4HTqcTVVW37mma9t6fP4GrqyskSfqIx+Oh1+sBsNlseHp6olwuE4lEuLy8/BsYj8fc3NwQCATw+/0Mh0NM0+Tu7o5Go0GhUKBerxMOh4nFYl/3wDAMms0mPp+P+/t7ptMpXq+XYrGIaZqs12vOzs5QFGUbGAwG9Pt9FEUhm80iSRJHR0dMJhNOTk6oVCoAtNttzs/P2Ww2n4CmabjdbhwOB7FYDL/fjyzLCCGwLItSqUQwGKRarbK3t0c6nWa5XH4Cs9mM09NTcrkco9GIWq3G7e0tlmUBMJ1OiUajxONxWq0Wqqry9va2/YXFYvExynQ6zfX1NZlMhvF4/HFuGMbuPdA0jWQySbVaRdd19vf3ubi4YL1e/3uRXl9fyefzJBIJ5vM5AN1ul4eHh/fn7gR+kF/ZQQ/WnEhepgAAAABJRU5ErkJggg==",
        disable: true
      };
      engineList.translate[6] = {
        name: "汉典",
        url: "http://www.zdic.net/sousuo/?q=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJElEQVQ4jY2TMWrEMBBFdQYJuU23BsM2gbQBFSl0AEsEs+CzxClETpALpEwbttjGJ9hiwXLh1uf4W81EcpRNBgTfo9HTeDQjlnmCk7q4xrbP1joErEPIfGJsezipsbWPt5eiTo0BJfOqwjJPAAAnNevUorE54Hw6ZoCSzmN2ENFY3jifjlkNurpBNDbTFAcAl/0DRFc3DEhrkeptNgRwUkNQ4H8BTurfAV5V6OoGz4/3nHZXN3BSIxrL+ibgryIWAVQY+r9bOo1nwOvB/6j+Vqc+ryrWwqsdtrbME74+3/l7HUKxkZzUEJf9U+ZMe2Eb7O9UBnJSf/fBMk/cLOntqa1DgJOaZ4NrQJNXSrMEoUszAL01vXc0FusQ+BCNL+1FYzG2Pa51VtKhEx+TOgAAAABJRU5ErkJggg==",
        disable: true
      };
      engineList.translate[7] = {
        name: "海词",
        url: "http://dict.cn/%s",
        favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIACAAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAkdJREFUeJx1k81LbVUYxn9n7y1+g3qPWYMosaKyVBp07yDJwFuUUKOoaU0v0SwuTRravHF/QFA0CQoHJTQJvHDR6IMUvXCvYpkfR49Hj573eRrsvY9KtWCxWO96n2e9H89bAZhd2XoVuG08aXvIMna5hWVUnqE9W8uSPl16eXyhMruyddPwre2USyCVJFJ+j9IuLCE5JL2eGX9sO82d//fXS2CXJKmk25nl59ogm7epc+OhQY4ED/d1U+3qpNY44ZuNTb6sQ8MgqSDXRCKrKuXsUyc1br0wzlBPN+XK0pSx4Wt8+OIEn48/Qn80kQJFEBHVrMgHWzzdnQKQVip89fs6PR0d9HZkjA/0MjP6KE+NDPPJaJ0PVneKOgTZlbwSA5BU4KfOwTzvM/H1doPV3Z957YnHeOXJUR7/4wFrkWCJRKF2SK0Qp62g2cptEWWo4vvDJmQd/Lr9F890pvm7gkwReQoSh9Fku37MTqNBblf7LQGqPV1gk2BKXKZoV5TaWZP7h8fsHDWIKPudR/NmtZ+hrk4AlmonSBUkkYWi7Xhu2Nzb56TVYjpt4sSkmJdGhnhn8lkAfly7x0YLrEAuIigJxgb6eHcqd3yPf6/N/Rof3V29UGVOELuSrlkCZ/8Bg3qzyRfLv/HZ+g57RdcK4f1def67Oz9YmpFEn87pcSADhdNpmN0IWqaYC7d1Y3sxU8S8pGkr0gOZ/aI4V7TfnhNdmlKH7fnkl7nrC4rWnEKLCh2EotDFRQesizpZOrC0aOmNP99/a+EfiilTPoj1fYcAAAAASUVORK5CYII="
      };
      engineList.translate[8] = {
        name: "DeepL",
        url: "https://www.deepl.com/translator#zh/en/%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACNwAAAjcB9wZEwgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGZSURBVDiNjZKxaxRBFMZ/b2ZHbWITUxkRC4PnBUW0k1gkoFlMYmIR8R+w0UZBFAvtLAMS0ipC0guCd0GOa23EJGTPkBRCSCNHKiEgMzvPwmjCuiv3lft97zff7BuhQraWTouJLwE0mmf518a7spwUPxwZvlmLms8B4wWrLZhHPvuwUg44N9afGPcc4T5gK4pFgSUv/jHrre8HgKHJE4nzHWBgn/sZdBuYqQB1Q+5rbLR2DUBy1J89GIbEmNmQNW8DqxWAgcS5IQBT5vqYP3H1Gw9AHyosAKECVA4QuKfIPMhHVKygV4OVU8ByT4BDsiI6rWpusdbYUdgpBpLSMeGTRLYx2o5q9kT0ja2P3xU401ODQJz1neYdVRkT9C1gyob/Ngg/3VbifJf9TVg1L2Q43UC1eo3eb8KfB7O7uRf7T782Yo8hXBG4DFwvaRgFFoP4GTqt7u/bFuTOp5dU9BUw8u/BOhqy5fZ//4HvNL6ErHlNkSmFb4e9YM1WMV+5xjxrvM+P99VBngI/qnK96UI66OrpEhcnThatXx/tiqJJdDA6AAAAAElFTkSuQmCC",
        disable: true
      };
      engineList.translate[9] = {
        name: "金山词霸",
        url: "https://www.iciba.com/word?w=%s",
        favicon: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACGElEQVQ4y6WTzUuUURTGf+e87+v3BwxYToupoYVYgViLFiPtIrBNELZsIUIUFEXQqk1I/0JU24oWZRFFiyD7WhhBDWYfq4zCsRETdfwYHL33tHhtdLSF0IEH7r1cnnOe55wjPP1u/EeEYrLuaogpoJi4LREoBhiIQa3Btbb3DLZdQbwQIdSJIC7+8y+IPP5pAKnqEgMdz+lYusGvwm/uVo3Qu7OeOoXsbIkzw9OMLDiQDRLi7CED/gJ7x94R1o2RTF7naFBFz9AEuZLnVKqewcw2Ol/kyS0b601T84AJNbnPMD+BD3ZgzSc5/naKN7OOb4vGpS8FsjMlTqcbMGeYp4wQDyCUabWVeRcwWjS8xc9iytc5T7I6Qpxguq4C8UJMsuqKG6U5WOJgY4B4JTAlckImETAyvYQhiF+DmlfWKA21GdzkVR52tXAuXcuxlognXQn2J2oYmiwhpphfg+IVvJYlGDA+dZvzH4p0p5q43NnCx3ml/9MCDw4laK9VlAi8gFdCMQMzRFb7I5AYVnpeXWTWe+aAtEAARJkDDJ7o497NO5xt7QZzcRsBzMAESq+TRI+2c1iHN0/d/SzLE+Ps3nMEKXhMIMQLSOxs8VkT+rIBdIZNCyKCNTQx3Z6ht5Be9VwIzeIW/pAUxVwEDsz9dWMDQeMu+hb3kfflwhFu5S0+RIiyaVQrwhtmKxXUsQTAWMH8VvavMsMfIrbvQBU3VlgAAAAASUVORK5CYII=",
        blank: true
      };
      engineList.knowledge = [];
      engineList.knowledge[0] = {
        name: "知乎",
        url: "http://www.zhihu.com/search?q=%s",
        favicon: "data:image/svg+xml,%3Csvg t='1666873123741' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='15646' width='32' height='32'%3E%3Cpath d='M539.101 769.844l-76.117 48.43-96.094-151.063c-19.842 63.221-52.85 120.174-96.455 172.482-18.128 21.78-36.977 41.396-58.667 62.004-6.99 6.629-34.947 32.332-39.592 36.976l-63.762-63.762c6.268-6.268 35.489-33.143 41.26-38.6 19.391-18.398 35.85-35.623 51.497-54.382 57.089-68.452 91.54-144.75 96.365-235.884H117.749V455.86h180.373V275.485h-39.14c-31.07 57.089-70.256 100.198-118.055 128.832l-46.356-77.29c62.905-37.788 109.351-117.423 136.993-241.7l88.023 19.57c-6.313 28.544-13.664 55.33-22.051 80.402h203.506v90.186H388.31V455.86h112.733v90.186h-104.39l142.45 223.799z m173.068-3.157l50.325-40.268h76.749V275.485H658.869V726.42h33.189l20.111 40.268zM568.682 185.3H929.43v631.307H794.15l-112.733 90.186-45.094-90.186h-67.64V185.299z' fill='%230E87EA' p-id='15647'%3E%3C/path%3E%3C/svg%3E"
      };
      engineList.knowledge[1] = {
        name: "维基",
        url: "http://zh.wikipedia.org/wiki/%s",
        favicon: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACKklEQVR4nM2Xva3yMBSG3xPdBai8Ah0WS1iUiCYbeINITBAWyApImSAjuKOgSUYwFRv43ILryCR2IN8VN58lGr/E5zm/TgiR5Zzj2P5vV5ZlNNzrNz5l9BVMtoTx0Gb214aHa3EAWiL84Vo8AosDfAHAbrfD7XaDEAKr1aoXu64DAFwuF2y326R+PB5RluWTfr/fsdlscDqdRs92XYf1eo3z+fxoB/8rioIBMBExEbG1lkO9rmsWQvR6qDnnWErJRMRVVY20siyZiFgp9bT/BGCt5TzPkwZCSAAjzT87BA/h27ZNA3gIb6BpmiiEBxx6CoDruh7931rLSik2xoy0EYBzjoUQDICllFEAKSUDYCFE760xhpVSUe+bpolGLAlQVVXv5TBnzjlu27aHFEKwMSaZMh+xPM/fB7DW9l6myLXWPWSe5yyEmASIpSYJ4L1MdUOYcyKKFlcYzVhXvAQIi01rPamHtRCrp5T2EsD3NRFxWZaTaYgVrFJqMjUvAZqmYSJKdoQ3npobAJLRewvA5zBWjMaY/nCvh1Fq2zZZ+bMAvKfDIRP2fJgGX4xa62RhzgYY9rxS6iklfg54CD/33zn7LYBw/vvDw2hYa0cFmZqi/wQwvKRid0R4h0gpJ1tvNsAwzFO1krqOfw3g3KPai6JI6v4OmXPm15zXp6IosN/vk/rhcMD1ep1z5OPL6Me7P19ZltHiL6X/B0Dsq/Xjhn9sRg1/qiZijn4DhUA2yPD/DEEAAAAASUVORK5CYII="
      };
      engineList.knowledge[2] = {
        name: "百度百科",
        url: "http://baike.baidu.com/search/word?pic=1&sug=1&word=%s",
        favicon: icon.baidu,
        disable: true
      };
      engineList.knowledge[3] = {
        name: "百度文库",
        url: "http://wenku.baidu.com/search?word=%s&ie=utf-8",
        favicon: icon.baidu
      };
      engineList.knowledge[4] = {
        name: "豆丁文档",
        url: "http://www.docin.com/search.do?searchcat=2&searchType_banner=p&nkey=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACsklEQVQ4jZ3SWUgTcBwH8H+QeDCpLUXR2vKGyZzHFuq8ErMi1PBK01LSBKdplgeYCPWQZWFgGV2GQhbpQ4XNSs3l0XRTZ+pm6hRiTtnmXOKZZfv2EstSevD3/P18H778CNnmOfmYHSSE7NquJylVjq1O3pTQbWH3Y7YpZcNBhn1uFpz/5SzNdhOGOZXQTa2Ji60XJdgr3ibndBWjtXKSi7Ju33lCCHWTsnY28Uoud3tyo5Oruv/Jb/VO/4Hlsj7Pn8VSD5SM+KB83Ae3J5lIr2Z2bcLc41YZtYrAtc7FaPTqz6JPx4dkNg3CmRjUjnFRKHZFUgcb2SNchJ13ufUXZvJMj76a8YfmRwOWvg9ANlcE2VwhZPqLGNJloXM6ETWjQeB3s5Eg9Qcz1D5uozcpf+0+Il6IhELfhKn5z5BqL6BPm4ZeTSrE6kQIp6LwXBGJq4P+yO7mGWh0mrtRO3ma8xpVAeiYiYZcVwOFXoCB2TyoV5qhXHwG3eoHKBcFqFdE4NqwF3JbuF8pFIq1sSD0BDWzeS4EzcrD0K/JAAASdS4AYG19HdolFQCgS12BkgF7ZApYGkIIzVgQdoqW16jh4eUkD+plMdYNK2hTpQIAZLoGNCjifxfcQ26PHfhNbL2lJbH6M2CgRVTtBAvVI87QrkoAAIIvcQCAIV0d6sajAABC1SOc6WCAX++tIITs3Dgi7fJbx/kK+V50Td+FfFaIx6MHMarrxouJK7gpDYdcK8HDwUvg97ERUeBSuekHAk7uKbo+xkKByAH5H+koFrsgt8sBWe1uyGhlIaHRFSltbOQLgxaodub0rV53R2yp3dNSOReZIi5S33OQ9I6D2CYOYgTeSBP5oUh06Jt7kE3kVth4wcmMgrw3Icr8/iPI6Q9HVk8gzrUHGNIfhLTs97Dx/Tf/C0aUi3kge/guAAAAAElFTkSuQmCC",
        disable: true
      };
      engineList.knowledge[5] = {
        name: "爱问知识",
        url: "http://iask.sina.com.cn/search?searchWord=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACRElEQVQ4jY2SzUvTcRzHv5dunjqEHWJrzqVGPqxLeUkR/4PPd79Nk/QgFV6GWmhRoCAooWaSumUpiVD0DBVIUkqkl/UA5W/zYU0z0HBqkaZzk1d/gM56nz+f1+X1UmqXuYwKXFKCFhdaG7g9Hna727Hs7Gyn6DKczsbA7T4z9mzoY/jp8MRcXcODgEjVvyEilRQXt5Nmuc6pwkG6+r/iG1ikoPgRx080BUXOJoeIlGM/VB8+mt6J2rcfW0YP+YUvOFn0kvyCYWw2PwcPFvm0W3aHiFSSmV6NRwz+RHrxiMbiuIXD8RBLVhei3YgW3JIMoDWlWlgPPyFu3mBj1o/WgiEajwi/pvtILNxLDnBpIRr2EzebYLIDgq2shduJB30Q7gSzjVioA3ElARjiIREdgm8DEGwmMeljfbaD7Zl2CHYRMx9DdBwxkii1plqthgjxpS/E5rrhczeEOtkONcNEB6yEcGsh1Wq1JjWhlEoREe70XBr4NP586udyID4RGJzq7akb0FqjlErZ61kppZTdbs9yiUaLUCpChQjiLvm/EpVSSotws3WY2JEstmzHiOTk4a/xzYih94ZUVXm92lVOS0v/+shohLHRIAlbLuNvTMbemjRcu78ucm6vEktpbevn9Yi5NT2zycz3BVbTclic/0FkbpOh0RCNV+9GzkgSC2II7z68Z2p+kd8J2EhzQmYqK/ZcVteWmV2aZuKViXiSpix4vV5qay9QerqMhQOO6ELe4e1ZS0b04pVaLtecp766bkdIfwF25n38sMbXHQAAAABJRU5ErkJggg==",
        disable: true
      };
      engineList.knowledge[6] = {
        name: "萌娘百科",
        url: "https://zh.moegirl.org/%s",
        favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIABPAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAhZJREFUeJyN011ozXEcx/HXOc7mnON4mM0Wo7V5ahJtaTIkuSFFQnGjFrmRxIVy48KN5E7K0412Qx7WmodyQexCuSCxhRUlDzPLtrOj7cw5/n8XkzO2C5+736fv99Pv/ft9v/yr96bJSo7zIZQUioy1ouOKHjrpjjNCVX/57Za4oA9Txtqjabdt9kmdOrPVapKS8EOvK54KTDGEwByBapN1KJKS0m6XphjIalSsQajYiIRhxJWq1eexNnERk5yU1CLpnk++KvVtIsZlQve1uSV0aIwf0eyzZ3boVDIeYbQoqsU6GbMt0q7RR6026LdZaL6MTfKKRFHqgfW2mWdw9BGfWOiSTl+0yTvsuddarTRsqX4HRQ2qttERszSql7HMA9sKv9BlldB0m9TYq0G5i3qcFsgoMijmvrQZ7qrS4LmELgMmQ+w3QKWoPl1KVEuLa5HVpNiAwEzDDhuSMCjw3UZDipQJCwF94kK1XnmjV6cae+SFKuSkZe1TJyIAB3BepYieAkKAEjftNNVua/SbKSnvqx6BuHNuOOeqy84aUCanXEJ3ISAuLy9lru9iBqStENNhuVCIGV6a6q2cXt0q5MTU+lJAWOqRF4676pScb9KOqbTfW91CzHfdSh2g1WrF8hb7XLjBWu0qbJWxwIj1KhyyxTXbf6/OuzHLlTVH1AcRP8dP4kRqdtQT5X/Od9S77sT/Nf+HfgGu7K8KC1PzBgAAAABJRU5ErkJggg==",
        blank: true
      };
      engineList.knowledge[7] = {
        name: "知乎(搜狗)",
        url: "http://zhihu.sogou.com/zhihu?ie=utf8&query=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACk0lEQVQ4jY2SS0hUcRTGzyLcRI9Nm8BlbaqFm9xFi+hhm9EgrVZBUETOI3VsUGeiN/RGAqFyGmcRFCFUFJRFWCs1k3LunZnGbOb+73W0ssfo3HEG+7W4E4iBtPjg4xz48Z2PI7J+Z4Psj/ZJ/Z0+qQ//v/ZH+2TX+YjIvmi/nJtBQhNIu4UETMcHraUVyiKnvyPSEHkhQQtpjlN5JkXrw0mkSUcaNcSjI81xxKc7fqFaEkjQRKQ+3CdBC3FrnHv2hUS2wPauDDXditqoSeXZMTZeGWd3WOHqMXH1mGy7abD6ZAppM8qADotlLXGG0nmGzQL54jyTv0oMpPPsDRv0j82ifpR4a9iMKBuAmrCJNKfLgFbFnogipmwqWuI8iuXwPMgiR2KIT2fEtKmNmMjRGOLVGVY2e6LWAkC7SfW1cdaeSiGHPvAiOcPBuxZyaBRx67xTNq4e0+nleJy3yqZuMWBV6CM7bitc3QptskDn62lqbxlUXR5nIJOnLmoibg1pijP8D+CEwhU2GMjYDBo2dvE3+tQcA2mbM8+/8ObTLLU9SwGCFuJPIG6NFW1JdNNmw6Vx5PAo4nVOWDpB0EJaE4hHZ8uNDKXiPPeGfrI8kETcGu+UTU1YOSUe1RjM5BeV+Bfg1rg//JMnsRxPYzl63/+iwqujT87R9HiKNYEErrBiKldyEjQtBDRq7L5lAFDdmWZlIMn7TJ7N1z9z8eU3coV5UtkCI2aBV6lZqq6nEX+mDAiYbOlM8yNXorN/2nldn866C2NUnk0hxzQuvvyKpzfr7LzlV+5QiByI9kvHBJuufmZrl+Es/AnkRBJpXuD9CcQXR/xJpLWsUBaRXecjcnoaCRhOpHbDIS/W4nkoi7TEi38AwHibcZoJerYAAAAASUVORK5CYII=",
        disable: true
      };
      engineList.knowledge[8] = {
        name: "Quora",
        url: "https://www.quora.com/search?q=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADQUlEQVR4nO2WXYhUZRjHf8+ZzS0Jw9oUtMSa2V0TI1MJwqiETSzNWnFnxkzpoi5CSqKLCIwGL2Shqz4uFvoAtZCZYEet9GI1Ay+EDRQ1ktWZvNiIVNA+2V3dc/5eNDvunPPOeLS9Uv9X5zw8z/P/vec9vM8Lt3Szy+Im7kkx5W+PTnyWCRYYTBc0A2cMymb0kaCYHmBgQgEKj3OHzvGOxJvA1Ks0k6A4yWPTqlOc+N8AhRRzJfKCedUC4yjGF+bxEz5DwMxALDfjZYmmStMhYGOmzKfXDVBIMVdwUOLuarLHxzaft9Jf40fykywMoI9xX8kz3k2X6L5mgN453HNplKMSM8eFD2ZKPGWGGkCvDMSuGgOPlzKn2FGvxnMFL15iS8gcS7C5kTlAusRujCM1QfHhtw/X/3ciAMUUSYPXQuEL9ggHGplXQY1ijb+4959h3o4NcBEyim7NYde+OwECfowExZrYAIhnHXnlOOYVlRw9Hyy00x4PAGaFAwZ/xLY3/nSF5TM7HoAxPVJsDMf1b064c6VoXzeAOB9lojkuwIiY4oqbcSYegDHogLorLgDelYNrvG5r4rQr3hT14nvgsRBUcuwx38ZzCnjFoBW4U/ALRq/Xwrb0IYYsYFrExRjszFIi5+INEyWip5bgUeXwdrUzA5/diC6J+RIpxFICenSW/uIcZgcBixwmn1mOwPUFIgCrBzgG9IYIWgpf8cQLA/wmjw0Y3Ubt2BXMGxllD2JpzeKNc02T6XGZQ51ZsDPJ/SNwXFzZe4N9mTLPjL0feJrbz/7KdonVDZrLS7C86yR76+U4Z8GLZQa9BM9XxioAgo58im7l/qtZ8gPD0+5jHXCsjrlvxoZG5pW8+sq38qTEDsSMaoHRr8p9wIy/NMoKiS2Oxp2ZMjurC8jh8T4KD7Sr3oi+aaPlX58Pxl84Ysn4PFviVYB8Gx3y6QP2Z8t0XBPAmArtPCCf9cAyYIHEpEqD34GfMRZLtQeWwXdm9AewHpE0+ChTZuN1AYQ1NuNXHOcCQL6V9xSwuWGRsTBb4vCEAIRV6CKhI2yVWFvH/JNsiTei4QmUcnj5L1lj4nWMhxAJjBN49GROsnUivW7pxtFlNM8U1KJDSwUAAAAASUVORK5CYII="
      };
      engineList.knowledge[9] = {
        name: "stackoverflow",
        url: "https://stackoverflow.com/search?q=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACRklEQVR4nM3XXWjPURzH8dcfUVsekjuhZVa0mI3kIeUhzcMFkvJ0sSgXLpCSkljZhRQXKLlAUliJkodSyhXSPJQ8jF14KuXG04rR/i7Omf2a/2y/bf/9fet0zu90Ht7nez7fc84vk81mFdIGFHR2DOqqQXPthLxMXLz3Jf4DD/Q1wDTcRXkhAIbjJmbgEkb0N8BnbEIWpTiHgfkGGIhJie+L2B/L1ajLN8ARPMDmRN0+XI3lnVidL4BxWIEhOI4zKEIr1uEFMjiFyfkAeI2puB2/N+AeygQ9LI95ES5jVF8DwAcsxAFBfOW4j1V4HqGyKNGJKHsCsBbLEn1/YRdW4hOGoR6HcEPQhAh6sLcAw3EUV9CIbbGO4ObpeCTs/XbcwknhXPgmeKVXAKPxJJbH4zDeRqgyvMJMnI5t5qBBEGkFTvQW4CnmoipO8gNDsUVY3XXMw8aYvqMl9mvKNWBPRfgANRiDPXgvuL0a1/BMUP8iLMa7zgZKA7BEiO+J2tX8UTj5SrBGuIgI23EEs7VvWU7r8j2QsB2YH8vNeIyHgjceCsfweeFG3IoFONbVoGkAfuKLEGbFmBVTm7UIq23AHdTia48ATp2t/1NOHOTVwpaVCidgZcyrMBKDY11lbL9UiIr0ANHaXquZRF2rEP+NuJCoHxtBKmI+RdRD/fi6LKxu2p0cp1sAaexNTJfSdkwDkPb9nnPFHa3gj9I0HujWitJawT2QyfVrFsOwr//ZMjXr/36dFdwD/9JAXva8oxXcAzk10J/2Gw08e05AgXJ5AAAAAElFTkSuQmCC"
      };
      engineList.sociality = [];
      engineList.sociality[0] = {
        name: "百度贴吧",
        url: "http://tieba.baidu.com/f?kw=%s&ie=utf-8",
        favicon: icon.baidu,
        blank: true
      };
      engineList.sociality[1] = {
        name: "新浪微博",
        url: "https://s.weibo.com/weibo?q=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACpElEQVQ4jb2SXUiTcRTGH9CZNmeyvXO+2163tSWaFWmsMmtpSpC1EBNDJaiky0AEL6S0D4pKHVFpXmTaB5FdtIuEqBslBCMqKyNDUFKpLQ2rOb9y/s/pIlYUeBFBz+U55wfnBw/wHxO7zowNa4zIAKD6a3pPOkpG6zA+WoeJ50fwJi8VOxc91gLKzpjYwjUq1cbwLA7QbluJHVuSkespxsWpywi5HNj+JxtToZWOv7As980kp3G/1T4pAXJ42VCCpp5q9KZbkHmhFC091ej7JQgk3JLND4LJK3nckcJ+Rwr3W+yTOUuW5rvV6pIqrXRib6L6QI0bp7uq8NRlx7aRs/gc5uO9RqU76EjlUZOF3+llGjGYaECSZ/t0CV8+KTaeSU7jLr190GWM3N68H9d2rEaB34PZH6/pE9umbCt42GBmX3YezRytJXH9JoVaWjlQWcUfMjfzmKzwsySrzwDYAGCtAmdDEZqRGR2d609azr6UVRy40kJibo7eDg/Tw+5uGvT5SAhB8z4/TVRW0ZCshO4ZlccZkdFbfro36PVtAesKnrrrZSEEnfF4CAABIJ1OR16vl4QQtDA/Tx93FfC02cbdim1IA0gAgDvx0qPpfDcLIehJby9pNBoqKioit9tNKpWKnE4nCSFICEHjhyvIn2DkfqtjMqyCGrXG8y07j5mYOzo7aavLRYFAgLKysggAHSwvJyEEhfx+8m1y8YzFwU16QzuAiHBpzA+khFd88hQvBINcW1/P63NyOE6WqXDfPhqbnubQ4BB/LS7loMnC90yWHgkw/tYeCZDr1eqW97sLJ7ntBr++1MgDV1uZO+4zHzvBX9Od/FJv8FfrpHMA4hetsAVILYuIOOSREi+3GpX2xrhlt2tUMed3R0WVGYGkRcF/yXdyajYEKzT4iQAAAABJRU5ErkJggg=="
      };
      engineList.sociality[2] = {
        name: "豆瓣",
        url: "http://www.douban.com/search?source=suggest&q=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACOElEQVQ4jZXST0jTYRjA8UfQNd2w3DqERIQQBmFQNPFgHVwI2SHokKTQpaB/RJvZ/JPLhWWkCcq2lCIhFILyEHaoYEr9LE1/bXMzqYOYTmeUOT2olWjfDjYV+qcvfC4vL194eR6R7Zqjkqf3SK5ubfL0HslJuCeSr1ekciNSmoAUa1bPvh6pMCJyRNcmJVqqntehjvhXLa02EynSIpKr80iJlmrFSceHLtoHlP/qGfGxs3ZvNKD3yGUDYtWw5XoaJqeZzPoD7Gs4+JsMdzYmZxYxxQakUIfYjdFAEnI+lpa+VgCmv88QmZ1k6uvUkonZSaIn3WVGLLGI3bAiYInjYfARAObbh0i+ksLmyh1Lkh1bud/bAoDJmYVY4v4e2HQ1FTkhyNkVjgt1L+v/FYil9d1TANydd6hsu0mN4qZGcVGjuHA8u4Z3tBeADHf2H75QoKX0iYPP0+MADEaGCX7sp//TewJjb/k2PwdAz4iP1KrdSIF2ZcCAFCUhZwTr40sAHG46hpyLQQr1iC0R/1gfEzMREsqSEeu6xffLASNSEI+cFrZV72F+YZ5GtRk5JchJIeXGLhZ+LNDse7B4Z4lFLiZGx7i4SLe67qKGvPSO9S2NSw15UYd7GIqEABif/oI6rKKO+jG5zIhNsxxoeN2ILxzgzaif9oEOXgx24gsH8IWDdIe8tA8ovBrqxhcO4gsHSHft/xXI1ytSbkQuxCNWzerZEhGHEZEcXZNUGBF7ElK2BuUGxLZh7icJ8DyZ0CDAawAAAABJRU5ErkJggg=="
      };
      engineList.sociality[3] = {
        name: "Twitter",
        url: "https://twitter.com/search/%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABR0lEQVQ4jWNgGEyAH5e4bXhCgX1ibqOVb2gCklpU9ealvRuRFMCBau3cCwxTzvxnmHbhP8PEk//1yyfvl6xb9sDGLywJRaFh/+ZTDBNP/rfOrZ8PM11VW9uAYcnj/wxr3iHwwvv/eZfc/mxkZeeEYoBvdnkdw5p3/xnm3PjP37TunXVu/XyH3LopKJqhODCrtIKBgYEHxQCDliVH4YpWvvrPMOfGf4aZVzA0M6x595+Xl1cEI6RcfIPDeFc8/oxNAzLWWHjuNq5Y4PFvmT6fkCH++dWNuAxgcPAJCteYc+Y2PttFRUUlcBrAwMDA7x4UEWUzbcchbJotbW3tcWq0zq2fz1+38h1D597/DPNvo2h2nrBmG1QzMy4DmNXU1DR8I2IT/FtnLYThkPKWTs+g0HA1NTUNfJqRAY+kpKQ8DEP9y06MxoEDAKUW4Kpi1NnUAAAAAElFTkSuQmCC"
      };
      engineList.sociality[4] = {
        name: "Facebook",
        url: "https://www.facebook.com/search/results.php?q=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAl0lEQVQ4jWNgoAbQtE48bOXX9J8UrGmdeBhugEvs7P8eSYtJwi6xs//DDcCnMCx31f9j5x79//X7z//3H7//v3H3NVyOKAP2n7j3Hx2QZMDXbz///////39+3RK4/0kyAAZcYmdhyOE1ABd4/PwjZQYsWXecOANg/oUBGN8hYhJ5YYBNbjgZYOJRdZhUA8w9a48QmVfxAwATIfnUl6gLIAAAAABJRU5ErkJggg=="
      };
      engineList.sociality[5] = {
        name: "微信搜索",
        url: "http://weixin.sogou.com/weixin?ie=utf8&type=2&query=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAF9ElEQVR4nL2XS2xdZxHHfzPn3CfXjxvHiWMntZvEaZ2mjWs1VIqqREjUooIFD4UdEiwrEAvEplIKK1iCQEKAoBDRVS3EIiJQkvRFUiTciCRYSWOH0NRNr4nt2r5++9xzvmFxjq+vH0mchjJXcxfffOeb/zw1I98dOkwNtQPHgF6gE2gF0jwYBUAJGALOAH3A8LLQr7n4LPBDoAfQB1RaS2mgI+HPEht4PAFTVdQLnACeWq3cMByGAwzBR0klEocRAXY/YBT4dKKrF2IPtAM/IHZ3jWqHT4566aSJg+RkGxm2oKRYZJyAMpN2lUm7whITCALIZoG0JjoHfYxjCD21Nnuk2C7PsEs+R1EeI0Xdho9HssSs3eRDe41b9ipLTCKbj14PxjHfsF5s+SsjQxOd+jV26XP45GtCsJ4UnwbZR73spdkOcdX9nLINbRaEAr1KnO2AkaaRx73v8LB+GY8siEMERNZbLyLxucQ50CyH6NYXaJSuOwLegDqVJPaCslu/Sos8gxErHiu9z7mTLzP4j/OYrTwqIpTeG+Tcyd9xY6AfzDAiGqST/fo8WZrYZHK2KkbaLKKRLh7SL1Qlzjn+ef5VLr71R945+wfmp8tVT0RhyKW/nuLiW6foP/175menERGMiCbppk2excxiDHfntBqGAdv0MBmKVeQiSnFbK/lCPVtbO0hlslWbVJXmto5E1k4qncESoaC06FF8Cjgi7B4/HzM8ydDII2u8Yzx+uJedex6jUGwincuzokXoPvJ52h/tpq7YTCqTAwxfwVfHDmmnTZ5gNLrCopshshBBk1JdTb5heJYlLY3r4uan0mx7aE8cY9tAtnMPglGXNhqyQj4FvoInBdrdC8y5Cf4TXOfawjn+tfB3AptfVyE+Bk4iHBU2qnVzG2e0AVnPsaMg1GcUT1bOAQpekYK3hZZ0J/vzn+HGYj9vTP2akeA6WgNCDQhtnnkrbajoTsrzPnQ0KsWsoAKiiqjW3DEQQxRSmqErd5QvNb1IW7prVW4oBs4qjEcXk95+b/IV2uqEvB+DcVHE5UsXGbx2tRoqEWFqcpK/vX2OiY/GMXHsyOyjt/gtCrq1WiUa14AwEp1n0l1D8O5pfTEr1GUEI66IkZESv/3VL3j5xEuUy1NJgxLefP0sv/zZT3nzjddABGcRHdlu9ueP4iz2gpoZZrBgo1yrvMSSfXTXVqpAXdqq2WJm1Nc3cPDJHrr2HyCbzS4LeHj3Hp44+CTt7R3VClLx2Jt7Gl8ymBny7YGnbDlmAuzyn+NA6nmyspWNupmKY+8WKKT8qlRECMMQEUF1NfgwDPH9lbFDUMYqN/lN6ZvMRGPLHojjYQbvV05xOfgRoc0hyB3rd1VYzPA8b51yYJXyZXIWxSEw8NfWt+EQUviSo2LzzNowGdlCRhpQ0ph5VCIjmUvum0SE6XCUxWgWLGlEqy7g06w93A77uV7pYyIaICNF8tpCXloAoTy3jyPZr9zTMxuRmXFj/h0Ct4CIrveAoLwXnGTa3SSwMiIeS65MOfp34iHj9lQTO3MddH7qaZxtrnQhTsAPFq5weeZ0kpNJH6hlZwHj4WUCm4lL0mJYgofgofjMhBP8aezH3Fp8F5W7l22tYePBMH8e+wkTwYex9wzUnLGaAVNwsF4Ws5hya+FdXim9yMD0WSKroOKtSdg4gVU8VDzGg2H6Rr7P9bl+xLT6lm9mAR9j9heUkcUhXil9j0cKh+kqHGFX7gB1fhO+pIgsZDacoByO0pKJh66JoJQML9WwB76ZlYhn9vsmQVmM5rhU/gsD069T8Io0pLaT1hyhCyiHt5mPpmnLPsqhxi+yPb2byaCEriRvyTezoY8LoBZIZCFlN8pU5TYk7X15VL8xd4EP5q/gawpMaj0w5DtzZ4g3lv/RNrSyH1j1XwhskcAtJicG4IAzitFnZheWO+L/kS9g9PlmNmzYcYwTrNmOPkEqIRwHhjVpRGcM+0biCfcJWu3MrN+wrwNnzCzZjuNgnTazQdas54Y90HouyLr1XESGl/PwvyqcdNFgnYiiAAAAAElFTkSuQmCC"
      };
      engineList.scholar = [];
      engineList.scholar[0] = {
        name: "谷歌学术",
        url: "https://scholar.google.com/scholar?hl=zh-CN&q=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACqklEQVQ4jYWT2UtUURzHL/QH1LMP9hKVNUKFWpP7TDrjU9uEo4WPWlERUbSoueSMaTWjTBCRGV3HiCsSWrTQApVSZBtZWEZSUWZkC3PPne3OzKeHK1NKy4Hfyzl8P+d3vt/fkSRJmpWSVbU9vbxbMZXJSnqZrMx3yErqmrN/r7V+Zf76jjNz5mYXSilZldtKfGBrA5sXcg7Dpg5wX/lzNV+FlmuwsRNy6r9HJFO5v9feBlaXILNWxenT+Pgtzr/W2Oc4azwalqMgLXZ29di9JMXj/xH3P4pybjDKhvYg1qMgpZfKyko3lPk0xr9PF7/4EOfTjwQAiQRcfqpjrlMZeBVjc2eI/FaQ5jlkZWs3qKHENPH7yTg5DYKKExp6DGJxcLRprHILAJr7w5hdIC1wyMquHmNj3/kQN57rALz9Eie/SZBRo/JwLAZAtRLC4jIA7r4pQHqprBS0QkaNysLdAXbKIQAiOjh9Gml7VOS7kaSooGkGwFQqKzYvWFyCgiZBbqPg3mvjRv9ABNPeANeHdSbVBOu8GvYWA9ByMcyKmQCLS5DToFLSKlDuR/kmEox+Moyt6w2TtidAUbPgyKUwZceDWI7MAFhdRgdL9quk7ghw8bGeNPXdZJzKjiCZNSpZtSp5jQKb9zeA1SUw16ms9WqcvBlhcDTG4KsYoxO/ohXhBFWng5jrVCwuQbHnN0B2vaDiRJCJqdzvvtRZfUyQ3SA4dSuCbtjC0JsY5npBYRLg9PfaPEYK14f15NA4fRpLD6jkHxKY9ga4PWKcvRyPk9toGF7sBWmR45S/pN0Y5a6BaLLdroEoGTUqy6oNc99NGk85dCHM8oMCqzuIvQ2k2XPzLAWNX9UiD9i90D0EE8Yo8GQc/A/g2QSMfIHaPsg9DMUe4/dmbrnz8CdxKwtDTtdexQAAAABJRU5ErkJggg=="
      };
      engineList.scholar[1] = {
        name: "百度学术",
        url: "http://xueshu.baidu.com/s?wd=%s",
        favicon: icon.baidu
      };
      engineList.scholar[2] = {
        name: "知网",
        url: "https://kns.cnki.net/kns8/defaultresult/index?code=SCDB&kw=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB3klEQVQ4jaXSMUhqURzH8YuBrSbiIIKIS4vo4ORQgyJCBg5Fuuqgsyh3tKFwUsjFycEIwq0lBMc7RLQFIl4RnLxXzqbe4Yp0v28I6vle+F70h99y4Hw45///S9SO+Ukkasf8XovFgkKhgCzLrFYrdtZXgBCCw8NDbDYbnU7n+4Cu67hcLlKpFEKI7wOPj4/Y7Xaen595eXmhUqmg6/r/AUIIQqEQBwcH5PN5HA4HTqcTVVW37mma9t6fP4GrqyskSfqIx+Oh1+sBsNlseHp6olwuE4lEuLy8/BsYj8fc3NwQCATw+/0Mh0NM0+Tu7o5Go0GhUKBerxMOh4nFYl/3wDAMms0mPp+P+/t7ptMpXq+XYrGIaZqs12vOzs5QFGUbGAwG9Pt9FEUhm80iSRJHR0dMJhNOTk6oVCoAtNttzs/P2Ww2n4CmabjdbhwOB7FYDL/fjyzLCCGwLItSqUQwGKRarbK3t0c6nWa5XH4Cs9mM09NTcrkco9GIWq3G7e0tlmUBMJ1OiUajxONxWq0Wqqry9va2/YXFYvExynQ6zfX1NZlMhvF4/HFuGMbuPdA0jWQySbVaRdd19vf3ubi4YL1e/3uRXl9fyefzJBIJ5vM5AN1ul4eHh/fn7gR+kF/ZQQ/WnEhepgAAAABJRU5ErkJggg=="
      };
      engineList.scholar[3] = {
        name: "万方",
        url: "http://s.g.wanfangdata.com.cn/Paper.aspx?q=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJ0lEQVQ4jdWSvY4BURhAPwoS8TuTqESC3lN4DZGYVqGTaPQa4g1UYjqxdN5EoURI/CQ0M9/ZYnYya9fsRrHFFqe5Jzm5936ftEXatog9EZm+ii1iy1xkQbUKlgXNpodlQb0O8TjUao/O940GJJPIRGRKr4fCd0wTXa2eO4BK5SPQ6XiHqh6Ans+oYaCz2aPz/e0GpdJfBk4nL7BcPn+C60K5/MsNTBMdj9HDAd1uA3Y7dLOBYvGHwPWKFgqoSCiI/BC4XNB8HrUsdDRCB4OA4RDt98EwwgOcz2guFzpG/sEYXwp0uziuq59x73d1DEOdxUK/Osd11XUcDfag1UKPx2DO+z2s194nhuwB/h7MRd6IxSCbhXTaI5OBVAoiEUgkHp1PKgXRKO8NfBp7UCxd2QAAAABJRU5ErkJggg=="
      };
      engineList.scholar[4] = {
        name: "EBSCO",
        url: "http://web.b.ebscohost.com/ehost/results?sid=8e76c941-084d-4b93-b05a-d5f182196017%40sessionmgr102&vid=1&hid=128&bquery=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACJ0lEQVQ4jZWT3UtTYRzHT+w4pzddeRFdBAbd1Z8giXtJz9mKvBDCxMqkrK57u6kEyx13zjHWIl8TEbMptaLpZMeMCgdBS8dSRC8WWAS9UJRS1j5d7AWnjuqB78UPHj58n+f7+wpFLp0il45Z1hBs7nVS0krPdoXM/YyEIpdOgaRSWt/JGZ9BvWeUOiXIUXWMxvZxGrQQTd4wTd4wrkv3sDh1LOsBYpVKaX0XPaEYmfPx6wqHlSAHLt/nlDdMZO4tyWSSHXUdmKrUXECxS0eUVIS9V3kYWQTAiCYQKlpT1itaESs9BKYWqHU/QrApuYDsYFMYnJwF4PH0G0RJxeLUKJQ1BKubbYdusvNIF2ZZzQOwKww9mcsCTJKKKKmU1PgoPzvElkoPBZK68RM3AxjRRMp++TWO6yFGns3nT2EzwIcvyzyILBB+mWD1128GJl7nvP2vgOjie6zn/Ow77+d5fInhp/P/BzCiCQSrG6GsBfsFP/1GHMHRhsX5j4BMCoWyxtaD19l1rBuzrGGWVYr3t+cH3Jmc2xijU8NU5UFwKFwZmGLPyb7sMmUBZllDKGvhbtrBxKv0ItmVlMpaqG4O8O7TN7bX3kKU1gDMskZJjY/G9nG+r/wEYPnHKg1aCMfFYaqbA6gjLwCYX/pMYdpVFmCq9LD7xG36jTg9oRgdwWm6x2L0heN0js7QOx5jcHKW3lCM0zcMxPVdyKmzdY3SFc6ptKMtJ4U/fkBXz/LD6BYAAAAASUVORK5CYII="
      };
      engineList.scholar[5] = {
        name: "WOS",
        url: "http://apps.webofknowledge.com/UA_GeneralSearch.do?fieldCount=3&action=search&product=UA&search_mode=GeneralSearch&max_field_count=25&max_field_notice=Notice%3A+You+cannot+add+another+field.&input_invalid_notice=Search+Error%3A+Please+enter+a+search+term.&input_invalid_notice_limits=+%3Cbr%2F%3ENote%3A+Fields+displayed+in+scrolling+boxes+must+be+combined+with+at+least+one+other+search+field.&sa_img_alt=Select+terms+from+the+index&value(input1)=%s&value%28select1%29=TI&value%28hidInput1%29=initVoid&value%28hidShowIcon1%29=0&value%28bool_1_2%29=AND&value%28input2%29=&value%28select2%29=AU&value%28hidInput2%29=initAuthor&value%28hidShowIcon2%29=1&value%28bool_2_3%29=AND&value%28input3%29=&value%28select3%29=SO&value%28hidInput3%29=initSource&value%28hidShowIcon3%29=1&limitStatus=collapsed&expand_alt=Expand+these+settings&expand_title=Expand+these+settings&collapse_alt=Collapse+these+settings&collapse_title=Collapse+these+settings&SinceLastVisit_UTC=&SinceLastVisit_DATE=&timespanStatus=display%3A+block&timeSpanCollapsedListStatus=display%3A+none&period=Range+Selection&range=ALL&ssStatus=display%3Anone&ss_lemmatization=On&ss_query_language=&rsStatus=display%3Anone&rs_rec_per_page=10&rs_sort_by=PY.D%3BLD.D%3BVL.D%3BSO.A%3BPG.A%3BAU.A&rs_refinePanel=visibility%3Ashow",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABr0lEQVQ4jZ2TPYobQRCFvyNUMpGTjgQbGAqBEZs1i5AD4VWzBoNgF1cihB0NONyk1/mgEwxzgmFuMHMD6Sa7RxgHQ8uzI+HAFRXUT79+7xVMQjPUO/zxFyfv8ONcM3Tafw4nuHZPlxZM62lBu6dzgrsYNsWKNQcA/YAW9xyKew5xSSy/UhWfh1qx5mCKvVsS74ivz7wB2CcsrogAAiIgmqGmWP+bHuD1mbd4N/RgitVbGic4zdBwQxAQm2NxSSwfqI4/OYUZwRSrv9FohtZbGlOMckPVv9ALSP1IAxA+EsYQNUPTYPs08NS/0JcbKvIFeZgRNEM1Q53gwg1hSqIpZoqVG6roiWFGyBfk9JG+j/Te4cOMkN+SX5PLO3x+OzzmHT7NnRFETyw3VKZYviC/QDAfmE9IzwgSB+P/HXecxiic4GyOAdSPNAJy5mCsQvtEFz1RM/S451RvaeKSmIZtjnmHF5CzClMftN/pTDHN0OQDgLj6u+idD5JMyYkCUj5QFevBhcUXDnE1oBKQ5MQLop3g2h1dgnlNBZtj7e7KLYwjHVP7gy5dY8r/eY3/G38A1vO4VlociLQAAAAASUVORK5CYII="
      };
      engineList.scholar[6] = {
        name: "JSTOR",
        url: "http://www.jstor.org/action/doAdvancedSearch?q0=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADl0lEQVQ4jS2RS0zbdQCA/3cvJh71ollMICN0FhpwbBlZx+Zg0NdC3/23pbQ8B91YGQOtCAOZJQrIaillLVDgJ6+BPMTJU91Bl7mwOBQQjEuGzJMHTbx8HvD+5Uu+fFLGSy/XlipVQlaohC1NKeT0TOFSZgm3MlvYUtOF+ViKMB9LEbbUdOFWZgk5TXnEKVRCTkkTkkeRMb/cEGS+sZb1T5r54sZVRpwuhq1ONsUU+6tr7C2v8jg5TtLh5uv2Bta7mllqaWDRX49kS1OKe9eqCBvP0u+8RNynI+rIp/nEcdqyT/HX4Qv+/fsfomYnd4xq4j4NAyWFDFboSJjsSLbjSjEbqKXPdpGBEi19lgJWoteZD1XRVZTD1uoyz59uM1hup18uoM9eSMSSz0CJjmGHG0lWqETCZKfPns9Mq5fuwrOETRfpNeQRNqp5srjEwdYO4zfKGasz06vPY/ZWGZ3nThHTWpBsqQqx8tF7DFYYmGnx0u8o5MPT2UwFS2jPUbI5t8Qf27vEnBbW4wG++tSPCNiZft9DTP+/YLUzyFCFHlHvYK6jgpD6FBFrAWHTeX76coXDnT169VrmbvuYD1VyS6Uk5iwiZrAiyYpMMSK7GHAXMtHkouN0FiN+MzOtpfTocvnt4fc839ohJpu569EwVFlM3GsgYslnrNSH5M7MEuELOlpU6QyU6Ih7DWwM3iTpNxPKO8mzzR85+GWXXq2GHl0uC53VDFYW06vPY+HdAJIt9S2xGAww21bK/fA1OvNOU/vKa/Ro1ISNeWx/84DD3T367UaGqi8T9+rp1qi5/urrDFqdSI40pZj2VzHR6GC2vYzlSB3JKya+TTYx0+Zh/4eHHGztcNdtZaJJRtTZWI3VE3UUEdWYkFxKlejXGmlVKYi5tEw0ygx4tIzV2bhzWc32xgN+f/yEhM9BxPIOwzUmQuocItZ8Rj1eJGuqQiwG61kIlSMCNrouFXA7921C5zL5rDifP/ee8WhqluYTGYiAlc8bZKKOIkZqTExUVx1tvN92kz7bBbo1ZxitvcLPa+tMNtSxtbzMi1/3GaupYbLJzr0PSrljOM90sIS4V0//UUKWGHN7SZQbGKoyErUU8V0iydOVNR7dmyPhKmPEb2Ej0cjoVTsfX8il48xJxhucDFncSNY33pxfvBJg1F3GbN11kg4Pw3Y3k9V+hK+SIYsT4a1gzFNBUi5lxFXGqLuMqepaplw+/gNcwmcGmhKGRAAAAABJRU5ErkJggg=="
      };
      engineList.scholar[7] = {
        name: "Springer",
        url: "http://rd.springer.com/search?query=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAuElEQVQ4jbWRsQ2EMAxFMwjFzULHJvR0GeAaKL2GV4jEANmBiorqOipf5ejH+Dg46b5kRYLv5x8niKNl3SQSC6fs/a4UvOamG0pxyrKs231A24+H8xKg7cdi1ukKjcTngEhcjBobT72SC0ADmjA6pyxNN/gApHPKEoklElcAHYJLDRpdjXaJNrL9FjCaNnrTTwEK0RfAl7gMsCBPH3eAzfYaWN5eDgnuqgLs8ySv5+Nr7fP0J8AvegOhkGr6AYHSEgAAAABJRU5ErkJggg=="
      };
      engineList.news = [];
      engineList.news[0] = {
        name: "谷歌中文",
        url: "https://news.google.com/search?q=%s&hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAERElEQVR4nO2WTWhcVRTHf/e++crko/kyX201jQitIOnGhcWqUBWLSGgRVNCVFqouXFQFa0XQXRRcWBpBURRBo9JWcZGWghhqbVOK1I8uLEksmKS2yTRt5iszc+9x8Wbmzbx5mca1OfB4vHvOPf//+bjnPliT/7uoesq7v9k3o6JOn1gBBAFE3HfpG+C6FZqR8krJRhSQK8z+8eSh9SthhOoRWLTZPklaRDxIEWFagIxlZF2KRzov09/4A/suPc3ocqSCZJGOVn31MOoS8Ms8ihsGDug0j982z2DLONgomFaeWfc3o1cG/ou7mxMoiDBt4VYD77Utsrt7HEwWpAEQsC24YQpbW39h7KtOpjbGGFrvgAY0dOu6Va5PYNpqRlqW2Nt7EgoLUGgE4lCufkkEbIT471e5f0a41tzCdE+M4YE4X0bzdQnU0JOLjw2xcG6U8GyUXN29NTwWTvejvu+CmHF1YsFaQloRijeTibf/5LS2j7cd/GR/IAGZGJwnfK3j6o3nQMxN0GsJ5JcUS0ciqGil3jWyOPRcOoLWYfJNzbO6oWGs/dPDzyoAObNRMDlAg55j18+p4PMpHqb4vyVoTco6C4weayIf2YYCxJortxw/060BMOnzKO2F5C/xKsBXmSRA0IBY+ytuyKC2LWzF2LwXRjGiygfvqQSvQvBFX0m4nFFRCNB14uxDZQKu5E+txFoAI7BcAGurwQVIG0gZ9502kCoIaQNWqEmqIFhjpkouysdQ3Zt4QE51SSn6kiwsw+ieGH2dHtc9IxlmkkJIw+UsTLweJ0iOTeR443iejoiXSRB0InGgZKOrdjgeWwESOXjqLqcKHODN3Q5zy6XuriMV5VRAQUCh6Dh38YuaDABQyP9FiP5SBj54IsKdm0K8+tF1TvwTptGBRB56ItARUYhAbxQ2v5UGwIigcMuFQJMDMe1xSRpoU9Xnq5qAXR5Ds7dksqXfVR+dDbO5EXYMaArWS93YpCVn4cOhMMbW9rtSiqWMcHDcnYY5Acd3vqsIqO3p5+VH7rHCoOvAXe9wwFh4aVesavPHb6cIA9sHwzXgJRER3h/Pg0DaQiHvNXttBgDyfA0ugflFQ2erw+m0sDOiUK8kQMAMt6G1IqagKwrq5UQRzY8OhBQPt0fKRzGZyZysCjqI9aPvpATg+HXL1IthNvREsRYmZwy3b3DQCs7/meW1bw2JHHz3QgMmYHIfPZXj898MjcXmfvdw09zgWar+D3TttuIQEeHBFsV9h5ZdQw13bHTBL0xm2PGZe1NlDXS1aXo7a5+BHk2m4PkNpznvxwrMwM7hZFUys8bt/qRxO7uveNmUjC6kBFsxBU1RuSmqaAp50/PE/qYavOD/AV8tY7oa1F/qLXHPb8UFGDyuV0Ogjr2r9xn4gfyXVD1/qyewghf/vbCi+Qr7AwkowogED1kJ+JCKhaASiIBSgf2+JmvCvyV4A+6kXQlFAAAAAElFTkSuQmCC",
        blank: true
      };
      engineList.news[1] = {
        name: "百度新闻",
        url: "http://news.baidu.com/ns?word=%s&tn=news&from=news&cl=2&rn=20&ct=1",
        favicon: icon.baidu,
        blank: true
      };
      engineList.news[2] = {
        name: "网易-百度",
        url: "https://www.baidu.com/s?wd=%s%20site%3Anews.163.com",
        favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIACtAAAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAHRJREFUeJytUUEOwDAIokv//2V3cnFUaJONUyWIaIGPGB0ZQAjxor9c8wBGbeqMXwbcHEAEEM5kdlFdZIY1ULc4MthFTywRd1N5reUXqqC7AQ9oI2Zjclwrczup1vU9lUilYDwGndBx2/gp5OjyiGoFx/+CG9j1PAn7jkYoAAAAAElFTkSuQmCC",
        blank: true
      };
      engineList.news[3] = {
        name: "网易-谷歌",
        url: "https://www.google.com.hk/search?q=site:news.163.com+%s",
        favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIACtAAAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAHRJREFUeJytUUEOwDAIokv//2V3cnFUaJONUyWIaIGPGB0ZQAjxor9c8wBGbeqMXwbcHEAEEM5kdlFdZIY1ULc4MthFTywRd1N5reUXqqC7AQ9oI2Zjclwrczup1vU9lUilYDwGndBx2/gp5OjyiGoFx/+CG9j1PAn7jkYoAAAAAElFTkSuQmCC",
        blank: true
      };
      engineList.news[4] = {
        name: "腾讯新闻",
        url: "https://www.sogou.com/sogou?site=news.qq.com&query=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC50lEQVR4nG2TS2hcdRTGf/87c+/NHTOZR2ybtEoz7SILWyRqCmKCKeJrI2gJFRc2G4siRF0qglpRcaFFAoqgFkWxtkLdFNGWToSmEGo19EFN2hKSdGaatCb3ZmbuzH0eF7HoVA/84Cw+Pj4O31HcMtG0Nqu09p7otr2sJJ7noYnnsBA2mHnOuqWdc8OT4//WazcXmWZESsOipXf3OOkfqKVeJ6nnMRGuhy6mROzrfbb48I+7V/5jINOM0P35AcIZnMReku07MAwDy7L4dGA/XdY6phqLnKqcYnTrruye8VFpiS2NoyKLL0q0PCau64rn+xKGoURRJFEUyfTSZfli5pBs+35AXi2+ICfnf5HCd/1FAC26lJ0ldsE7TV2G0HUdPZnk3LzDiTmb7e8c4/ycwZ6tu/ig720aCYOJ0k8cHPx4CECJ85HgX4NgDr/zALquM7Wwyj1fnWlJufzyA2RSOldvlBn74316Owq8O3PwLQ2zF5q/QupBEokEAIcv2GCmWth/fBalFN25Ddzf/RgT1ybZnOp6Q8P9Hfwp0LeglALgy6UGtLW1MHZlFQClFI9u2slg4XF0CdFonoHIBu8sAEfOLVH2ANNqwU53rB0cQIS+7L3MezYazUlEAjD7iEV4cvt69nVpYJhgtP2NzvIzhTWDOCYW4Wp1AT8Ox7W6egRQuMsniKJorY2WSW/g8fRGg34zZlscsmB7BEFAve4SxzFeUCVWvEKF/MjipcuyYttSq9fF8zyJokjiOG7hz/GT0vz5uFSs9VK+8y554ujwP2Wq3L5xZfHrb8R2HKnVatJoNsX3fQmCQFZXq1L95DMpk18j0SnlZKdsPnJ3FkDdNCmTl/R7r8GmLrwLVzAG+uH0JI1jh5CwicqYqIyFMky8by/23YEz1WIAUNLzReOpLUMq047WkUbLZNGyObRsJ1p2He6Hh6kWf8sVcOxbv7hlSuTevH7foDijL8mNHUNSIleskOn5P+1fu3twDSB3ukoAAAAASUVORK5CYII=",
        blank: true
      };
      engineList.news[5] = {
        name: "凤凰新闻",
        url: "http://search.ifeng.com/sofeng/search.action?q=%s",
        favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIACBAwAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAA0hJREFUeJxNk11MW3UAxX/39t/ellLAAgUyEBFwIAsOAkNkakxMNjcJ0S1u0ZGZGT+S+WD0wcQn49P0ZZJo0LkYI5i56RwjIzoS2ISEIAzHpxLsYBIKLR+Fln7cllv+PiDVk5zH80tOco7S5kACKOwos6qGrNrHWZ8aZysYIH3vo2hZ2cRWV1i98xuh+7P8X0r7vwCA0jNv4qyqYebCZxQ3n6Hw2EmC7hnWRoYwIhGEzUbYs8DspW+Jr/tRALEbzj/aREHTcQbeaObpy51YXTn0nTpOZHGB7PqD2HLz0FeXMcJhXPUH8f7aixEOQbsDecmVIr3Dg7KroUrOXb8qg54FeflBp+x5qVFu+rwyFoslHV5bldNffyl/KMmVbQ6kEA4HeYeOEl1ZQbFacT17mP4XD2PJzKLuq3YUITAM47/SVhsFJ04hTYKht19DZDxWTUZ1LRszf5J7pInArBvfQD/Vn36BISVS10noOsJuTzKi3iVyG18gr6sD1V5aBlYb24ZB6t5yVocGAcg4UI9/fJRbzz/DzSermDz3EYZhYGxtkUgkmO/4kYKXT6PaCovY2gyi5RciLRrxcAhtTwHbUnL/ynfkHGrEmrcHX18vK8ODBOfusa2qBOfuYcTjqNaCQvTlZVL3VaLabKSWV2DJzOLuu2cRaelszrrZ33IBQ9fx3x1hKxJh7c4Qluwcgn/NoMqEgf3hErZjMVKKikmrqCSz4SmCUxMsdl4l/9gJTCkpbM5MY9I0EnqU0KwbYbcTnv8b4fm+jf2t36B7lxBmMwBl731A8etnMWlWVE3D19O9s9KaOgKTYyhIZDxGZH4OdaW3G9+NDhyFDyGESNrmzMRityOEwN3aQnp5Bc59lSx2XSejtIzAxBjBiTFUgOlzH7J07QqqYWA2m5NWEwaj779D4I9JGi62ExgdIepZIL24BE/nT8Q31nemnIhEWPrlBv7fhxGONIQjjeiyD2//bUxmC8/1DGDSNG6/9Sq1n7TgvthKfGMdBVB23ygecFJ0shlbTi7xUAjFbCarupbs6hoWun9m6vPzlLxymqjPx+T5j9l9cBKwDUjA8UgZrgNPYHXloPvXWBsfRVEUXLV1+Kcm8PbdSoZR4B+hMGuvciFlvwAAAABJRU5ErkJggg==",
        blank: true
      };
      engineList.news[6] = {
        name: "CNN",
        url: "https://edition.cnn.com/search/?q=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAF/ElEQVR4nI2XXWxURRTHf3Pv3W2loC2flggFET8KSRURo2h8MFFj+AokoAYffIIHHwwESRRfxAcxkVoSTMQnQsAYJaAPopbU2qqhCAJaTW1pawWjtNqy61J7d/fe48Pe2T17WdBJJmfuzNwz5/zPmZn/mPdBDOAAbiQ99W0iSdQ2qi1K6hpGMojJfDRmxx3Aswr1Arpao2y18+LFLky0kO63Y/b/UPV7ttOpUF3KkXCUjC+uFVfqM6pPO+Jp5YmonaA8FFbGDdBKoRzykBLkJuqzBqG+PavQKtde63YcCVt0DujixDzXxtp1QouAVW49TypENDIe5aGwxSq2nlvlJoaANsT2e9eLeyUEKiWjKOXxBa1RUA5/cRfoxdzIy4RCRCOjcyFuABRibrdbQOV8MWos0AhU2nLaMGvA9UJgvdRoWI9dhYaj/vvfCNgxbXA8BEHMOwuz9hwlhWgX2Kq9D1yXsQce4JIIbk0N9Pdzf38/f86aRV9TE9POn2fxwECZ171PPMGwMdzd2oqbzxMAeWPoe+wxvD/+YLy+Huerr5iZyZQOrjaQTpBvQE6DfOt58s/YmIiIDH39tZx9913pOXBAPluxQn565x0REbnY0SEiIicefVQmQDIg327fLn4mI0Pt7SIi8sX69XIBpMfzRETk+5YWERE5sHixdIK0g7SCOPpsDx2H7PPPU11bS8/hw/z28cekLl4k/ddf5EZGmLl8OUE2y+9vv83gkSMsbGnh99pafGOYtHQpQ4cOcXHfPgDu3b27PGFNKWv0mo6O6Yy2Nh5sbqZz2zbmP/44TS+8wPTZs0kPDmJ8n6obbuDv4WEa33wT47pMXbSIm/v7uUmkYNiZM9yzezentm6luq6O3jvvpCoI0CUebk8PNDzyCJcvXGDx5s1UTZ5M5y23sCCVot4mYjJJYAz58XHmrVrFL0ePMm/NGkaMIZtKYYBcOo1TU0PvwYM0vP46oxs2MBeuMsKW4qmaTyYB+GH/fuoWLOD4unUsTKWKO8AA6XS6kL1BgIgwPjTE9zt3Yk6eZO5DDxUSMgxZ8uqrOK7L/NWruW1wEBEpC4EupWPdKTTHR0cBqB4ZuWqyMQaMQYIAI8KCjc8SXrrE9KVLmdHYSGQBhCG3rl3L4LFPmFxfT5jLFfqvZ4Dj+wA0LFsGQN2WLVeTjMhzz/W4fP48E2OjNLW00LtvH4hAEOC6Lu3rNzDc3c3Y2XOcbW6GiQlQuaAPLqd4jotAkGf2svsY6+lh0Zo19E2bxpVEgpzjEBiDl0xiRDAI7qRJ9Lz2GsZ1yZw+zVh3d8HLIEC+bOfHl16m8bnnyPT24iYSSGSASPm96VmKFAIfNi5i3ZmznHnrLX76dYj7z52jauasEmsYv8LwwAAmDJlUV8c9+/fT2dfHg0c/onvnTggF8X3yNTUs6eygesoUlr+xi+6DB0lWVxcNCCmdmp5mMPN7ezn2zNM8eeg9fv7wA77b9QZVN07B9ycwGBzXJZ9KseyVV5BcnhBYeOIE7vRpzH3qKbr37KG6thZclxA419xM07YXGe7oBMfhdgRct5w7tIK0gXSAdIGcAvm0vl6Ob9okksmIXLkiks0Vai4v4vsy2nVC2hsaJA2SBml7+GHJDQ+L+FmRrC+DIBdABkCO3nWXiO+L+Fnp3LFDWo2RdpDjIJ+BmM9BPApbLUnhYEgWAGdgzhyq6meTqK4q3pZeIkGiq4uFmUzxig2AnjlzyK5ciZw6xR0nTxIAuWhscONGmDoVs3cvU4IAP+rPA+YYiL0JqygxImuIZkbX4wNx+q0NyF5DFnNA0yciaS20XEAzWn0daz4YqH91O4xVvb29QCnIUTr14vTpvzihdUQvmlPSOmSrnePZhTRh0BDHmfB/kVIbAs0HtdSGCrFz4FrKAirTck21tWJb80oGFSTWAE2VteJKsY4bAOUhiL8J4zmh5wng5WNKbcI5lAikRSDOBW1bo6ehzleQofoWol0Qhz0OLcqYa72M7Jx4KCqFRr8hi4QkfvM5sYn60RF/nMZ1xJ/lcei18f8CXzwtfnAJiVYAAAAASUVORK5CYII=",
        blank: true
      };
      engineList.news[7] = {
        name: "BBC",
        url: "https://www.bbc.co.uk/search?q=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAq0lEQVR4nO2USwrDMAwFn0vvZR1NvtnzydRN06iNf4FAoGg2NmIUy4oSIAiCILiZ5Pa26F/qPX4jJEESqjrMXPUAQFW7/qEDZoZSCkQEAD6r8095JOFXEfFuahaQ3mG/bxUw8/yhHdKzFd0Sa629xCUv54xSyvAZhxkA9jZt763HzJtdoFvAVZCEiHwN3mhoDYB5SNoWx/5ZnfJU1Uj23Pv/AwtOEARB8Oe8AEX8nWWaRvY7AAAAAElFTkSuQmCC",
        blank: true
      };
      engineList.news[8] = {
        name: "Economis",
        url: "https://www.google.com/search?q=site:www.economist.com%20%s",
        favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAALEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//w==",
        blank: true
      };
      engineList.news[9] = {
        name: "今日头条",
        url: "https://www.toutiao.com/search/?keyword=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFN0lEQVR4nMWXTYhTVxTHf+/lJTHJzCTRDE61jiLFhWBBhJbSdiEoVHBTqFoFXVgoiNBNu9GN9mNTLbSF0lpKC1JcVK0iLkQobVEKghWsX6jggFO1MyVOzEsmMy8m79/FmZjJJFH7feBw3/2fc885755zv2CKJA1K+kzSTUl1/fNUl/SrpM8lLWI6SVolqfgvOO1GRUmrABxJg8BFoA/A933i8ThhGBKGIY7j4LoujuMA4HkelUqFyclJOlFfXx+Tk5NUq9U2WSqVIplMNro+sMwDdjScA7iuSxAERCIRwjDEdV1qtRqu6yIJ13WJxWK4rtsxgEgkQjwex/O8Nlk0Gm2JFdjhAWuno6VSiVqtBvDgr6fShOM45HI5KpUKlUqlYwC5XI5yudxxhtLp9MwgXvKAedORarVKNpulVqtRKBQeBJLNZhkbG0MSqVSKeDzeMYBoNEpPTw+JRKJNFovFQIJqFYpFuHfvSQ9om8tSqUQYhsRiMYIgIJPJkMlkKI+PQxBQGR1lYmQEfB98H9f3cUsl3FKJmEQ9n6deKDzAGhwpl21Mc3Y8R4cPi2KRBvu3b0OxiFsuk6pWqebzRMfHcX0fFYsQBDgzI/4b5Aj0D9rrTIkEDAzA8DDU6y2i9lLtRp4H/f2QTMKNG62ylSvhiy/g2DHL8RNPGA8MWJtOg+PAnDkwNtY6VjaklZ9/Xlq3Tlq5som99ZZtIT/91Krb3y/dvm2yUkm6elX67jtp/37po4+ku3dNNjQkJRJtvjoHsH27DQoC6YUXDNu507Dvv2/VfeMN6auvpN27pYULpWjU8Geeka5dszH790t9fe1+ugYA0r590vXr0pEjUiwmvfuuGTtxolXPcaQNG6TLl00+Oip9841Urdrfr1/f2f5DA0gkpAULpHS6ie3ZYw6OHetsLBKRDhxo3fF//93SsGJF1wDa91PPg2+/tYo9fdoKCGDWLGuDoL1AX3wRzpyBTZvgyhXYsgXefhtGRmDtWvjkE9izBwYH2921IbUarF8Pp07B009bdW/YAI2db+Yhs2yZ8d69MDpqq+Sdd2BoCDZvhlyuyUuX2o89chWAFVNPj6Vi+XLLvSSdOSPt2mUpcRzpvfdMdvasVfr4ePdDePXqNj+tM9DTAz/+2Iw4mbT1O52efdb4wAEz8dRTttEMD8P58zB/PqxZAxcuwJdfwnPP2fa7cyfcvduevpaIZs+WLl2SfvhBOnRI+vRT6ejR5h8EgbVvvimlUs1x778vFQrSq69Kr71mOidPms7Nm9bfuvVPLkOQBgak4WEz8PXX0rZt9v3bb1IuZzrz5kkTE9KdO5a2Dz4wnb17Tf7yy9bP523TemgA8+dL585ZLsfGpFrNBp89K82aJbmu9PPPhh0+bGM+/ND6u3dLmYx06pR0/Lg0d27T7saN0iuvWD3NCKD1MFq8GA4ehHv3jAsFaz/+GG7dMp3BQVi0yPJ68SJkMjAxAV0uKI+i/+Y0fAg9/mn4uOQ4hIkEYTKJGu3UdzSdxuvrg1TKVlgyGXosWWLAdE4m27FpeAnMSSKBkklrp5xl5s6lMjlJ0OFO2Nvbi5dKTYdCj2vXWpR83+94pX7kjwMRwHFdIq7b8Vbc6SbtASHT7oXRaLTrlftxyHXdrjYikchMKPSAO8CTDaRcLjMxMfGXA+jv7+9qI5vN2s24SSOOpM+B1xvI/fv3CcPwLwcQjUap1+sdbXieN3MW9jmyh+IvTL2O8vn8vzYDmUyG3t7eRtcHlgH/7+P0AUlaJHs6/6r/8Hn+B0w7zXRC+ZfTAAAAAElFTkSuQmCC",
        blank: true
      };
      engineList.mine = [];
      engineList.mine[0] = {
        name: "MDN",
        url: "https://developer.mozilla.org/zh-CN/search?q=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAABi0lEQVR4nJ2VsU4CQRRFzy66GCtLrWysjMbEyi+wNFHBmGDpH1jYWJtAq5WxpoFEorXxB6xs1CBBI4WJVhpNoPBayMAuuzOw3FcwvMe5eTOzy0OYIGCHMk3ayBJf3FMmTxCieotN6lZwMOpsRQzIUBwZNlEk0zdIjwtR7BqQGwsXIicg4HVsgxYBFGzlGS1pepjFHlSSCiUZ/ehQS9rVerJB1eOZeUKapINNXjz14jMbzdhxWImn5oi2dCa3FuObCH85HoJL0o3mIgYeMt0o3qBVbaZ659LlfpOOyCHza5/ewsPjKJXJv0L7ORjhDIwSDnGi+/kxAv6QfAsIvY+At5SxGSxbkEshtKqanpS1PwcmGgN4xfE6hZ4DowXqlitLkh9PlVJe42e8rYvIBr4dG6ANj0mF/ZBBw2Xw7HOX1NY5Hlfd9b2r/1ufmq22gcc18OYyqA39U53Smr3aIosg7zJwRt4MltJYeEn0R9tJavw0NNqEYDvVcM31uH6WgAJVmnSsYIcmVQrh8f4HufpcPqh3SFcAAAAASUVORK5CYII="
      };
      engineList.mine[1] = {
        name: "Can I Use",
        url: "http://caniuse.com/#search=%s",
        blank: true,
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEXRa1hIvVUBriaErG7//vzQx7e116nq4M2Dy4FmYktwx3Tt48/y6NQXsTH+7uK2fGBhwmhoxW7Wg3HEMxe8EAD78Nqn0plRvluZ0ZLKQizNs6qupZZ0zX/9/+3669vM5cUxt0QlszpQqV6HhoPP3L1YwWKYooEQujB9ynxWUTgly0Tp38yhlIhAkEAldSRdOC706tbw5dL/8ezInXD169iK1JO7u6n+9ODAJQSY2J+Wrc+z4bLluKpnkcWbyYz/++CMzYcAqQz25dd90Yn90/ll020qwEPk28j5/OjhueEstkDfoo7k2NP+68n/5+CmSj3i2MX85dI6ukzx+ufhqp7+8/r39er29uP77NU0kjgvvEQ4LBc8nEFOzVqQvY0evzvN+f/m+drt8uHpxbnb5s7s7dpwomfb0cA3p0Ti7tfB473n3bzc7dDe3szr//9SZH0Avij37tng1ssttT7dk4Xf4t6U4ZOm3Kh81ntaelrv6Os/WC6I3Ik+iDvuzr/z2M6AgICBgYGCgoKDg4OEhISFhYWGhoaHh4eIiIiJiYmKioqLi4uMjIyNjY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSVlZWWlpaXl5eYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7////XnzsNAAAAmklEQVR4nF3KQQuCMADF8U2EQT1hklJCQSIhbIdCCtepRodgpxB26eKxj+ChL99mhOm7/OHHI8AdD+AFeZzXRXEhTLKKSuZyYD49xFM4T+E0hpttprAeQ2x5YAZYJEsb6KgHHweN3f6DSnL/iLTa/B5lWOq21SpMdZum5Cn4nguTi+ydCWMEAVZVR/mOAqAd8AWgBz8H12qGYR9XXh8E2WsxgQAAAABJRU5ErkJggg=="
      };
      engineList.mine[2] = {
        name: "GitHub",
        url: "https://github.com/search?utf8=✓&q=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADLElEQVR4nM1Xz2sTQRT+dpNScqhJW7ZJ9mx706RJ0/SHbRHR/8Cz9ORBBBEUEfwjBJVePHhQFPUiIi09SNqkSbtJU70p6dH+IOChQmpNss9Ddqezu7NJmgT0LQPZN/O+75s3bzI7wD826QxjPURUawtUktrGbWfggK7rR3bnxWjc8v51p+AIlGVZBkAdC9B1nQXbCZuZXYwsy648bh1yvV6vA8D9Bw+xvLLSNrlFSPFUiMfjEXKJnJ5arVYDgMj4REfEdvtSzAMAvF6vg8/hqFWrBACRWKIn5EzEttYQ0ddn4bS8VE3yHs3cIaKYR6VSOfD7/WHTJ3P9YSJykCuKgp1tDTvGDNoxt/FEBJ/PF+J9LAMnJycEAFFb6s9CbDc7Fo/X398vAYDX8A+ACJH4pBOFmm7jpiaMtOHJAPD7+PiIiBqdthaJJUBEHbVmeKqqjjEBLMhQzbdifrNjAcX8phCTiLBbKn1jS0BEGJ9IOrJlkndlgngeUwbQ11AsylhnM+fbtpZzxTUF+BrpFzw9ECDCXrhyjQlgSyAq2a7TDyC1tu7AHvT7LQKO+ZT0WsCdu/ccvvdvX1uWoEq6LlyC8cQUSNe7a6LH6DMFgIhQyGUE+6W7QoxNzjTFtAhwK8RYcqYj8pu3botnbxR3YGjoPBMwODx8jhWi0fLZNPsdT84inpxti/jxk2eIJ2ehaQXh7PPZtDn7XYA7jH6WywQA8alLrFgKuTSm5y7jT7VqKaJCLi0sOD7WzczYIUWRWAYMh0oAVpc/WgA31j87QIR/ry2pgXwuDeLIgdPTEAD2iQgBbo8CjfrQsutWAS7bs9m2fffmJYgINxYXr/N+xydZ+fCQACAxPcd8dgFuxsfYzcRQgkH3TzLDPOWDgxoATMzMOzpfvXiOsdFRIYlo/OqnDxgMBBrkoZCDT7Y7ANSVUMhDRNAyKWiZlOUk+bG377oD7KeOlkmxJRWRuwkAAH0kHJbM4traWMPWxhoAYGF+rmURmuMJwNOlpUcj4fCZLya8DRzu7TmuZu1YUFVbXs3cMsDbr6CqSkFV9X4vlbJuszfbhWj0qjFeakX+X9hfKwNpwLLdyLQAAAAASUVORK5CYII=",
        blank: true
      };
      engineList.mine[3] = {
        name: "w3c",
        url: "http://www.runoob.com/?s=%s",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHklEQVR4nIWTX0jTURTHP+fu59xUCJLGCgp0IIPSIvLPg9JTvZq+RBj5WJGySWVPKSH0ZCSWD/ZiFAQVqQUVBulbaQT2IkVEUhISPrTptE23e3pYm26t+sLlHrjnfL/3fM+9Qh4Gp5ubVOSmqlSLIACqGkUY8bp83acP3drYmi+ZYGSq3RP1RudFxJ9PmgOVU6GG0bs5BCNT7Z7lkuUVwPlncZaEi6GGsf4swcD0sUW14p954S6cryAoKoJ/j6VybxLEHAzVPZp1Bl63HBHB//2bYe6N2dLUJhqD68xKgANflpj7GCewL4m1qQnAJwPTLZ9ECJS7K2ja3gFogRuneRX4mYowsdSHIKRc7HJECAAYceEu2rRARECV6Ooa28pKUU0Tp0xRNseVpNXkqxljeDz5ig/zC0RiqywsLnGhf5jYWryQO00mv/j4+T6qqyoJVuzm3tNJaqoquN59ls6rN3j/+WtuubDgqJIQoRjAWsv9a5eZmnmHqiWyHAOgd+gOw71duIsc1lKRTUExE0aE51tZrbUcrq1h545yzp1oJmUtPWfacvzJoLN29KWzXhw76U6UxRJ2BSOu7GGZtyQnOTNdVft757YImn5IMy1XBHoKjfAP29JbPFw/7gUwAOH6sV5Fh9I6/1vEExvWl/UhE4TrxzvUchRl9a/qyoMfdftLLzU+WclvLQeDb1uDNqltiAZREgIPPY7vWf5XBvgFMS/Jw/yUPqwAAAAASUVORK5CYII="
      };
      engineList.mine[4] = {
        name: "GreasyFork",
        url: "https://greasyfork.org/scripts?q=%s&utf8=✓",
        favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3ggEBCQHM3fXsAAAAVdJREFUOMudkz2qwkAUhc/goBaGJBgUtBCZyj0ILkpwAW7Bws4yO3AHLiCtEFD8KVREkoiFxZzX5A2KGfN4F04zMN+ce+5c4LMUgDmANYBnrnV+plBSi+FwyHq9TgA2LQpvCiEiABwMBtzv95RSfoNEHy8DYBzHrNVqVEr9BWKcqNFoxF6vx3a7zc1mYyC73a4MogBg7vs+z+czO50OW60Wt9stK5UKp9Mpj8cjq9WqDTBHnjAdxzGQZrPJw+HA31oulzbAWgLoA0CWZVBKIY5jzGYzdLtdE9DlcrFNrY98zobqOA6TJKHW2jg4nU5sNBpFDp6mhVe5rsvVasUwDHm9Xqm15u12o+/7Hy0gD8KatOd5vN/v1FozTVN6nkchxFuI6hsAAIMg4OPxMJCXdtTbR7JJCMEgCJhlGUlyPB4XfumozInrupxMJpRSRtZlKoNYl+m/6/wDuWAjtPfsQuwAAAAASUVORK5CYII=",
        blank: true
      };
      engineList.mine[5] = {
        name: "游戏-3dm",
        url: "http://so.3dmgame.com/?type=4&keyword=%s",
        favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIAALAwAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAtJJREFUeJydU0tIVGEU/v57r3dmdJzG0a6T6UyaM6GZYkJhBRZE9EJcCEVpVIuIyGhRi6hNBC5bBBJRqxgiopoWlVZoVvQgUsuaIZPyNabzuukd5zre199CMaMk6IPDgXP4vvNxDgdYBKET/GKt30D+Vrx8alu5JCn5Jl4Mfg9zwpoyy7j2JjV8qLXr3wLnfV4UBB2bSyqXt7gKM0vtdjMkSUU0nOzu7Qqfbjj3tGNRgRgFHl3YsnPL7iK/IJh4EIBQAkoMEINC/KFrT+8N7Nmf77yrHvb9KXC7qdxaVlfe7/EucRJQTM9oYBiCkYEEXEWZmJY1RKOK+OROYFVZrTDR91At4n7zn2evdzgtzgedI1BUQJI0yLKKowe8aO2IYGhEQoaVOIrLlx1LDbPipu2OSvK5dS9vzx5XfIEhVGulfq+k14VjMzDVuBAKxUAjERjTMsCxYCzpyF2aA9PzyLh130p71MB1LqkzXSSRb1ufln0rN8+01ZyYgduVicl0DY6cJdCyV0FTOBAiw2KKw11iQzzP6szyZmGsW4xwUJRXxZXOI6mUcsq92g4GAAWFyVyBZenrAMLO75tSBUbyLXjpLQwdCA2IPczHz+GW4cGplKdklgwQUL4YbMYGEMKBAQEDgAEFQ9LAWjdCT3Ojv18KMkZOGxPrSxpiVJbkpA5Np0ilVMCyBoQuPBEBQEDmMjWvfRVIjFUNVbfJJD4R53wndzmFwoymAo/tIM9DqNpxBoQxzRF+wQCgGxSBZ88bK3c2+QCAybJlofHivXFLw46zr9vHaghLBg2qzk4C5sMAoGoaPrx8eTN4tfnGvDdKKQcAycQM7sff4X3zJVt1he3KikJPvUVwgbAsdINO/fgaYEY7/Wb7asG99Xh7aKEAAwC6rmM0JqJv8hp6H6s297cXtZMOjyhDmKAZrGymiplXk+kjSfZLz6evMb/fL//xWf+Dnxs2M3yo2q6nAAAAAElFTkSuQmCC",
        blank: true
      };
      engineList.mine[6] = {
        name: "搜狗表情",
        url: "https://pic.sogou.com/pic/emo/searchList.jsp?statref=home_form&keyword=%s",
        favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIADiAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAqlJREFUeJxtk0+IVXUUxz/n/O67772rjdH1NVpRoeVo1sZavnI0S0vFhaOBpC4S/0AuCqE0aNGi3IS4kEkEF+EiyoVhxIyKNsxYGxERFEVI5w/WKE/GAe/YvHfPadEdkaGzPH8+fM/he4RpkdXTOvARwjKgvUiP4pwDjiYDjf7H++WxwVlAN0on0A2cBAaL8gvAWmAXRh+wMxlo3H8EyOrpk8BZlOsIO5K+xvh0ZQDZ0rQN5zBGB7A8GWiMTQF+RGkhbCbIAlHZRJBXUUkEHrj7EMZFz+00ud/BOIYRkoHGRsnqaSfKMYRXUFktQb6npJFECkEeAkbuVVom3jTz3L/C/ADOVYwPFdgGfJf0NcZFZQcljSQOSCX0SFmfkVjnEOsiIt1OpKckyMxixW5gmyJ0FgeDSP6USJFYkUp4W2fEB7UtfkOfiG9WTv51pNoz+h6Rflac5BeETgVqOMMABN1DkOMS1KSkJamGzVIOZyXIrclNz3/zz/pna9WeUSsAw0BNAQcUoPrr3/cqJ25vcPx14BDOMA64z8X43HO/NvF++/ICoIArMITQATDxTm3rxKr22eUfhi+Vjt782LLmfHvQXOmTdt1zg9yfouX7C8BCYDDC6UXYAJz33D+RwKGHa+YcJ2ivjU/eEJExYMRb1uFNg9ynVujCOSVZPV2M0I+wBGWdBN1NSedLJKCFUc3xlkPTRt28C/MRnIsYb04Z6WuUFQjvJn2NsWxFbbEEWYLIc0Ab7uOYX8E5XT1zdyJbmu7HsKS/sS8q5HyJMQ/lt+ytdEty5u5l4Mr/2RlA4jDkLfvj0S8UKhT4FGEvwu/Azzg3/pvgZeAlKYdvw9OVL7xpH9j9ybXV3jsXZDo9q6c1YCOwDOHFIn0LOIfyms6KUymHPeWfRgYB/gUGFwYmsuO+WAAAAABJRU5ErkJggg==",
        blank: true
      };
      var engineList_plus = [];
      engineList_plus[0] = {
        "status": 3,
        "version": 1,
        "message": "应用app下载,由奔跑中的奶酪整理",
        "name": "应用",
        "engineDetails": ["应用", "app_xin", true],
        "engineList": [
          {
            name: "AppStore",
            url: "https://fnd.io/#/us/search?mediaType=all&term=%s",
            favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADtElEQVR4nL2XTYtcRRSGn1O3enp6mJk4TBDGIFHpjQtdGpigIApq/AGKCCKBrN2Jf0AwCC6EiOLKnYIKKhJcSBQMgiaKX6DmQwnGRNOrgUz6457joqpuV/d0T/fViRca7r1V1U+des97bpUc/+IBM8AUDADBCPdKuNK94TAbPqvlbWRtgimoxGcFQyglcFJ/kQY+DJKIchgaQADZ/SgA1PI22QG3MbjKcHwaA4QJkKJDY6NmHUfhThpgRt96lNrHRABBxI/AtYKHlVAL/6FpwjFEvxOe/1yQwQTHAte6Z9jfOsTda5vcttJmpbmfgoK/ty/xyaW3KEvFxEbgpcTVGYMrIAbeMs0nwQuaXO2d5JHbT/DwXW/T8quk6+fOWd4/9yoXtr5nqdgHInPAg0xqhhPwk5c8Rq6O5dYGz29epyFNSisB+ObK57z+4xMsSJtFv8KyX0OZN3JBLeYKkiaQSxDgg3LA5oGnOdI+hpqCCDcGW7x4+km6vZLVxj30taRf9iZovlvkmQsApxMiN3UcPvAMR9rHMAwnwk9/fclzpw6iWkBhDGK2jcNLkYkJl2ybeOnew07Nb1k6yGPtoxiGIHz62zt8cOEV1hYOMbBeWLEJ2b675qPwFLTPtceEq92TvHD4BmqKiHDq93f5+OIJvGtVGs4Pt6nw4AIJEqTlAc/jd7yJo4Eg/NI5w3vnXwJxMcOn+bxe5AqYOUrA5eW10/2ah+58CjOlW17n+Nn7WCxWd4XX0TyHp/cur3AbSw+yULQonOflr45y6+Kj0V51ln125Pm3w+e1/d71+zGMXzvfcm37Mr7waK2E213zHK6W2VBN6Zc9NpbbCMJrPzxLs7E4FT6P5uNfS83hMXoT8KGTo2/b7Guuc3nrIr3BAvgSdLLP54ncxiK3fEUMTAQ1wQ1tKDjxfHj+DZYa6zXg82tevY+Jq1ZJIDhp0Nn+k+86n6GqNSKfnu06CR73Dum5coHgOX3lI4SCkvI/+1zzZSeNHYWTV0IV4Y+tc/iiuSfZPq55CiIvw7EQUfm83ve8nubj8NBXcPVr+3wVbprmVd98T/hvfT66SZ2g+bTIq12Y4KsZ77HPZ8PDs5sN30PNMzgxCDc8NNwcn0+DD+tAfmioEfk8Pp8FB/DlRPje+DyHMwavkjCdCf8PzcfbFYZbspvh82nwcAlgqRTn8LgDmgWvYTXG2kmHWRG8SGM4JwMnwyrl4glXLBytXUw2iXkjhNItkv449CVOIvk8vorvLExADMHxD+83EPzS100KAAAAAElFTkSuQmCC",
            blank: true
          },
          {
            name: " PP助手",
            url: "https://www.25pp.com/ios/search_app_0/%s",
            favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIABTAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAhpJREFUeJydk81LVGEUxn/vvaMz45SjlZpfWBpUkyj06aIWFVGBCG0EN22CFi2CNtHSfZsyyFWL/ANCgkDCylWEGzcKLSKn8qOaGUbHdO69733P2yK6OemifOBsXh5+7zmc8+B5XkZr/cIYE4qI/ZcyxgRa6/EgCA4ThuFLuwOJiIRhOK5ERCulYmzSQlHz+v0ac4seAMdaE1w4spu2+qrNNkQkUCJilVLR48RsieHny8wuevihBSAeU3S3Jhke2M+V7trIa62lAvDu4zrXn3wiWwiIxxStddUALK4E+KHlwN5qxm500NeZigBR69pYRqfyZAsB6aTL3ctNXDueRgHPZla5P/GNbCFgdCrPiY4aqtxfnzq/AUsrmun5DSzQ35Nm6Ew9DydzPJjMMXS6nv6eNADT8xssrehojKiDUtnwwzM4CnrbE8znfZ6+LQAweKqOoy0JFLDuG9Y82QqwFiygAAdFb3uSO5cacZSiqyHO4zd5BKhNutTVuFsB/FkEYi21CZfbFxtYKGpGXuWYmCuhgLOHdtGcjm0D2CTXUWTzATfHPjO37FFcN4RiyTQnuHV+H66jtgHYSsjXkmbmS5nVsiFV7XDuYIrhgWZ62pIVvghQFVM4SmEEYq7iZEcNj4baWChqMi0J+jpT7Em5/K3olMtaGJnM8eG7z72rTXQ1xrebrkIiElSEyYi1oZH/ChO+72fCMNxxnH8CVx+vwwyO9nUAAAAASUVORK5CYII=",
            blank: true
          },
          {
            name: "Google Play",
            url: "https://play.google.com/store/search?q=%s",
            favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEg0lEQVR4nMWXXUwcVRTH/3d2IVblI2FLiolFUkzIFNFIH5o+mGpc+qY8GGJ88sFEU22DpIGqiBSIqcZoqpY2xFQ+hALbsqgopEQxhkQhjaUWJxhadE2hsizLxy77wdy5x4fdgQvd5UtIT3Iyc2d37v93/vfc2VlGRAz3MKzyYN/YTLJ18exJYTUWbQkprb9kFo/sNACTHXhgABXC2luUmHRFtVgtPClxV+2eFFvVQNLr3p0CUORBiJATCtnVcLBAC1sMqxv+4yMLEyOZnuriV1FnjTfJtgEIBVYoQNhvV3V/gUYWhiDTbePk+7h15vbvWb4PnttRACgAWOSoz9pVY9aukQWAhcGHcM4/YqYzdb6yJ2fho7ydAWAALMsQ3GtXDY9dEwpACiBAmKNgwZjhvWrzV9ceXDiTvr0AlugV86gANG1XaepZTf6aToZ12vC/NsTdIxm+mtIiOBK3B0CRkknnk3YV7pUQABAGT/1X+E53z98Yzgx++ML/B5BFTRfMZXHHhgAAP4Wzby9621N97/2YE/jkwNYBlBgpLQcm7SqmnokJIUCYE6HDt/jUr2lzpy48Gfj8oc0DyA7Eg5k8osIdGwIAOBmKF4GX9y/83AnXnnLg6fs2DiDtgLjJALiPxHUCAApDo8NNM44D0Cer4BrUcOfhlzYGgKiAmbL9q5ckjhOFwdFh57QzFxSdQwQegT7+Fe6k9MOdfWh9AHkHmOO1nJAgCgOjw06PM3epADI/IUDMHwK5+uFJqwOKlrbtyue7BYCI3myKE+KHiEIwaM/fX8edU848WJY1AWkuACAOkPcVeL6bgA2VdzsgVy8f1+mL9xsm4KwZWykW7y2DAM4DXJZceVMsiDWyprteK/vhooohWx7OPT68VL3ZA5KDBEA3cP76OE7HBlgtalYhN6bUiNVd9VpZb6tKxEDEQNd35y5BSA4QAdxAvy+IgwkZdDQ/n+I4IEPIjqxuPgZUfVOvlfa0qkIQiAACi+RQei5ql50wDPwd4njRupeeSs6iwVhyyyE33ypB2YFTzgbtRFdbpHIwCIpUScRAAqDfdufys/sHFzne/gvI2bWP2u8qNBrx33IURLrc3AnR3VHpaNRKvm5TibHIJSIwRQEhQkFgggtxYX7gwfL0M+TOjisQD8AUXn3OgIr2Rq2ks10FYyCiqGMRByAIhiJ+0hd5Seq1vqE1n7/rOiB3bxTi3bYm7c0Oh0pRcUVhIEFQGINBuBkGStMGejs3qLsBACnKm5u04ksO1VwJhSkQRCBgNkRGjeua59N8uspjTbU5AHO9pT38TlOzdrz9kkqMLcEZJLguxBdGKFiR8Wefx7YV5ZgAq+KtxmbtWKtDhcIgiMAAcBJXFjkv2ftHT9xfw60DSNafrG/Rjl28rBIYhCAYIE0nKs280fX9dgjHBhCCAwrKvmzR3mi5rJLCYBB5dRKVrhHf+cPUt6V13gyAVtrQph1t7lANxrjOjdpAWK98zNU1m7XdytFY8d/w0c+6kzvO1Z9ICOs8BL3liVvf3twh3dgA9yL+A+DGIba7GhlTAAAAAElFTkSuQmCC",
            blank: true
          },
          {
            name: "Microsoft Store",
            url: "https://www.microsoft.com/zh-cn/search/result.aspx?q=%s&form=MSHOME",
            favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAWElEQVR4nO3WMQ2AUBAE0TkEkGABRQj4XjCDAFoQgwUSDHw8bEhoZvq7vHLrWeZO2LhfBbCexD+G9PCrBAgQIECAgN8BVmx3PCZoUwH0w0EiQIAAAQIE5L2DfQwqapCvzgAAAABJRU5ErkJggg==",
            blank: true
          },
          {
            name: "Alternativeto",
            url: "https://alternativeto.net/browse/search?q=%s",
            favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADVklEQVR4nMWXXUhTYRjHf1aO3OJMt2k1FDFbCSFZkgaVeGEQgwIr+4CC6IMkow+I6qqL6iKCgqBAiEq6KK3bjC66iG6KPi0wrTWLNtZ07hyd+8jvLt4waefsbHPVHw68e5/nfZ7/ed73+Z93WZZjdyb5j5iTrGNscoLYQC+E+iGswEjst9GQA0YzmMxgysViys0sATkUAG83DEfVHUZi4hnwC39zAdiXYJlrmjkBORQA9xsA9tWtYnPNKlYuc7DAmjfl4w8qfP7qpbPHQ2PbI+jvg1AA2VGlW40svTMg97yFwT7untzDDmet7htFojGutj7g9O12MbGkOiGJWboRwzIAG2urdV0BTMYcTu1toLlpm5jwfUror09gfGwqcCo42OCk0lEIYUVsowb0D+G8PAgrtD58Qm31ct50uvD09vPy4xcAHPYCtq5fQ2mRPW7pifo6dl5sEV0j5adJYH4JhBURSAP3n73j1fXzcfNli4rEIDKguVZ3CyxSPpSuBItd9LvFLqoyDa9dXjq63XFrK8pKxSCsaMZPSgcsUj7y7GzR67JPTNokLjjXUb64GHuB9XeyFJGcECnf4et7ACodhZzdvQlnTVVaCVMmMD15c9M2DjY4M5I4KQLy6DB4uwBoP3soY289HYkPoecDjI1ysr42YXJ/UCESjWna0yIg/4jAYB/YJM4c2K7q4/b42H/+Ggu3HMf1zZcWgTlZYxrMh3oBuOBcp6qCHd1uVjSeSzqRVh7tLYiGAShfXKxq3n/plhj8oQmpQptAbAiApSWFcSZ/UOG1ywuGuTNKrkNAVEBN4/0B8YXEkNoHSg1JX8lUMTkxYwLaFZgtuKm1V0VZKdgkiAyKxyalLcXaBExmAN52fVY1tx/ZJUjYJDFOE9pbYJQgFKSzx8PayvI4s7OmiskMKKNuBRrbHqWtcjMiYDVKIFmhP8TRyzf/PQEA7A4w5HDj8UtOXWlJWAm3xxd3KXn49IUY/KqmGrKsh28kvJYHh6Pgfgfjo2CTaN6+gbrVFVP64Pb4ePy8g8Zr97SDFJVhzS1IjwBAcHQEfC4IBRM7msyiLaf/tizUTA5JCpE12wDFywhGQzAYEEl+KSU580Qic744NykiJSW0GiXRnhmE/h+Tv4yfzZcbwYt6jlUAAAAASUVORK5CYII=",
            blank: true
          },
          {
            name: "Github",
            url: "https://www.runningcheese.com/go/?url=https://github.com/search?q=%s",
            favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEmklEQVR4nK1XX2hbVRz+vnNv02xrIxu9N1mSlTiuIL26PdStiMjciyjq9ElkTwMfrMhEdOjDYEunU/BBJw71QXwUpA+WoQznZGygOOdEO6aCQWKbP7e5rptpM9qkyc+HJttdctNma76nnN/vnO/7zrknv3MO0SFs2w7Muu5uAfZAZAhAVMgoAFAkByAH8ncCJzYZxpnLly+XO+Hlah0ShhFZIA+LyF4AoQ79Fkl+HhQZS7uuc0cGLMvqnS8WDwJ4VUQ2dCh8KzlZAvBeXyh0NJVKLXZsoD7rCREZuRNhHyPngyLP+K1Gi4G4aW5bEvlagHg3xD1CGZ18IlMoTLY1kDCMyAJwodviXhNBYId3JVTjh2VZvQvkhFecwB8EviB55Q70rhEYJ/BLIyBAfIGcsCyrt8XAfLF4sPmbU6ljjus+d+/QUARKPQ9y2Tk5D/ISgXMEzoKcBPDfcoqzBPYPmGbYcd1nSR71corISH1zNyZ5Y9Olmnc7NW2n4zgXGm3bMPquaNrg6Ojon8lkstZEzHg8fo+mae7U1NTVRjwcDt+NWu3vW3jJUlDESruuQwCImObHIjLavIZK1x/I5/MX/da3U0Sj0cFqpfJPc5zkJ06h8KKybTtQLzKtqFaH1iIOALVazfaLi8he27YDatZ1d8OnwpEsQdPOrdWApmk/kfzXJxWadd3dSoA9bcYeyefzLUt3u8hms1cg8rpfToA9qn6wtEAPBL5cq3gDwQ0b/LlEhhSAaHOcZGl6ejrVLQPpdPoaySmfVFQ1jtQmFEhKtwwAAERmWkJkVNFTjG72lYGuigMA2cJJQCkAfju0PxwOm93STiQSQfh8agCuAuB7YVAij3bLwOL167tEpNcn5SiK/Og3SEReFpFVb0ydQIBX/OIUOa9Anm0zaMfmcPi1tYpHDGOfiDzmmyTPqtDGjd8CmPM1IfJuxDSPDA8P99yucDKZVBHTPCDAp226zG0SOdU4jI6LyEt1V+9r5M9VkTcgsg0ACEyD/EwB36tA4GImk5n1Y9y6detdpVJpWAEP1kT2QcRqZ5BKHXdmZvYrANBFjpEsAwCXB7oDIg+B/BUABNgiIoerIqcq5fKJZDLZ8tcFgOtzcxOo1b6r1WpvrShOLvaIHKtPbhkR0xwTkUP1ZlEPBGyS65bK5R+8dUFT6unczMwJP+JIJPKIVKtn2gl7DIw5hUIS8BShvlDo7frNBgBC1XJ5LJPJ/BUUuZ/kAQAfKKVeWN/f/007Yl3XJ9vlPOqTfaHQOzea3lw0Gt1SrVTOA9gMoEpNe8pxnJOrknoQNowKAL1NOq/19IzkcrlpXwMAEDPN7UsiJ2+YIE8DOE1gToDww7t2HR0fH6+uYGAJgOYnrpOPZwuF37xB30ITi8XiS5XKVxDZ3pwbMM3eld59YcOoovl8IS9puv5kLpdrORF9d3M2m830h0IjJMdI3vKkKpVKvmO8cjd1WSb55rr163f6ibc1AACpVGrRKRSSPYBNpT4EUAQ5n0gkllZUJ6+CnCf5kR4I3OcUCofS6fTCKqZXh20YfYODgxtX6xeLxeKWZXX6isb/mQzVdYidKdgAAAAASUVORK5CYII=",
            blank: true
          },
          {
            name: "GreaseFork",
            url: "https://greasyfork.org/zh-CN/scripts?utf8=%E2%9C%93&q=%s",
            favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3ggEBCQHM3fXsAAAAVdJREFUOMudkz2qwkAUhc/goBaGJBgUtBCZyj0ILkpwAW7Bws4yO3AHLiCtEFD8KVREkoiFxZzX5A2KGfN4F04zMN+ce+5c4LMUgDmANYBnrnV+plBSi+FwyHq9TgA2LQpvCiEiABwMBtzv95RSfoNEHy8DYBzHrNVqVEr9BWKcqNFoxF6vx3a7zc1mYyC73a4MogBg7vs+z+czO50OW60Wt9stK5UKp9Mpj8cjq9WqDTBHnjAdxzGQZrPJw+HA31oulzbAWgLoA0CWZVBKIY5jzGYzdLtdE9DlcrFNrY98zobqOA6TJKHW2jg4nU5sNBpFDp6mhVe5rsvVasUwDHm9Xqm15u12o+/7Hy0gD8KatOd5vN/v1FozTVN6nkchxFuI6hsAAIMg4OPxMJCXdtTbR7JJCMEgCJhlGUlyPB4XfumozInrupxMJpRSRtZlKoNYl+m/6/wDuWAjtPfsQuwAAAAASUVORK5CYII=",
            blank: true
          },
          {
            name: "Chrome WebStore",
            url: "https://chrome.google.com/webstore/search/%s",
            favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADT0lEQVR4nO2VT2gcZRjGf983U9du4ia7aYy4s8SEnooieBAVPCsWRFCiIsVL7VmoWKXX9iBUT8V/RTA2KkICIiJ4aSHooVBv1YaG7KrdDZoxu4nkz053dl8PO7O7k5lpd5qolz6w7Mz7zvc8z/t+3zsDd/A/QwEsLy/LzoRIKHRLJF1jWZYyAZRSIZLeWL/CSdb4MKOIbiXmum5kzjCMxCbMfoU9XFFKnRkfH5+OSpbL5VeBN4AHExnoFwMDA+8MDQ3NxOUty5quVqvN7e3t8/1y6iQG6vX6Cdu2j8Tlbds+4jjOm0k4Y6egX9zOtPjI5/MqUQf+DezKwG6q3xMDe4HbNrAX1UPCMQRordXYmv0cqa3h/l5skxQeQGWz7H/hFfRwNhGfAqhUKjctx7n0A/Vv5mhV/wKvcsFb4nfCZxBB50a4+7kpUo89GcspIhQKhfa3IJ1Oxz7YWrWpn/+EFIA2gqI7THTC62vI9Mfsf/gR9IF7b7pdCqBWq0U+UTv6EuK6Pcxh0e5ttCllmGSn5yLFc7lc/HvAXVxAGo1diSOCuA3ca1fjZKI7UDt9Erm2ECTtJY4Ujzbgh4zJgwydei8gHtuBL8w/90a8J9csLkZJhcdwpjTPB4cyFAc1Jy/ZwaTHmT3zPub9VsCEblQYvP76DvHg0dr6+zuczDOBWKgD35YvIwjfFwaCwgJoTfr5l1H3WVy4qjgxq3hrTnNxQeGaeZzsFN6uhsRBuGtzPtSBwBn4svQjp67Mdqp6+/Iqh0sbnUpHZ76msm5w/CvdQ9vFuy82sYabZIpTIXH/fyv3Gk7mKSDiDPxUXQrs60cPDbOxT7djStFSBmcvqhBt2yCcvaBpitHThaA4gFn/JWAtYODnteudbguwmjI4/KwFCKlHn+DcvKK0ojp5X9j3vLSiODevaQw+HimOCOaNYryBFWc9kBQRGl4x+yYOUrLDVfv0frxoQys1SfgMtKHcatiA4zjHAEZTGUSk8/Ppp57Os/3rIhOj3Yr9Ee/IeDcTo6CdpWCwp01i5vA0j4I3hmNjY5+Wy2V9wLznw99aK6F3dyVtMFv7g4mRG0hTd6i7reheTo60aG4sIW4rIi+4RobNzc1jlmV9FtmiO/iv8Q8bO7AiEMGc8wAAAABJRU5ErkJggg==",
            blank: true
          },
          {
            name: "Firefox Add-ons",
            url: "https://addons.mozilla.org/zh-CN/firefox/search/?platform=windows&q=%s",
            favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD3UlEQVR4nLWW3U+bdRTHP+dpFSllI6hzJmucEWiTZizTQtG5uRcgYRoS451eqBcmXHjhjf+B116Z6JIlvt0YExONAsqiw0zNKIWCkeTpYGrEFEIclDGElbbHi2elb89DW+m+V+3vvHy/Oe15EQoxtdBGeqcblSXC/nFEFDtEEx4y65dQeQEYo4XXCQQ2bH0BItdPo5kjuIxpQn6z0CQAqAqT8XfJ6lt5i0zS6jpFe/udomSzy01sJb8BPVOQ5mdaGCgToepmIn4F9NmCvB/Q7X8TkQyAAVBGbgV3kUw/XUa+vTZcTA6gJ0kyimk2Fz1PXj9RRG7lHSISfy/31SB2o72MPC/3wO7HuRUv28lRlOfsfe+KmFvx5sOzTfauOkRkPmgJSKW67BMCGSybaTazsTqK6ilH35yIjdVvdyuh0unsmg0BCNfMs6A/2DqJKMovCH5UH9qbvChwBSGG6nnAbevicvXT1XFZUBUi8QlUnStRb4hE6faHEclaXTA/38AaPUi2CaWTrL4D6qojYRbkbYzsNBj/Ih0xQrIDuTYsxYT5Parn6ijgKuHAaTuTUfZi/YGO1Y3cwjFif7RUFjC34iXJCKoP15VetYXUnTGiNw6WmvI/wexyk9XnlVptX5gAdz897bdyD1YFogkP22vD95gcIIykvyucmAbRhIf0rWHnCVdnKD2sszusDDLrl8pn+70Woc+wzicAbmul2mxd4SYq72MQB21HeQPl0YrJRZKgHyL8inIUZQh4xEbF86iKGxgDXipJksXgJF2B+O7btHmRHR1DCe5B/jcu6SMUyO/86J8XyWwtoHiK+eUyImrQ3PoaIleLjSwXkQM8GUgg9w0Aaw7s2xjugdKDg9DRJRSzxHmKhoZXAAyCh27zQMsAwo8FDilbju62RUQ+txegI3S1/WavjfxRIzKDx9PHiceTlgCA44c3cR28gMiXQBrRj+1JAGTJ4X3ROUQ+A9IgP4G3l87HdqtYvgsWFxvx+bYck10zvwIdtGEZpydw1jFubsVL8NDtsijHgFJR/6QbSKUGQT9C1T5OjFfp7vjU8Zi1C9nTqipEzCs1DSmRLOg2KhHc/v7c2nVC+TYsxNTvvponpKphtZyeIb3wVCX3vQWEnvgL5IuaBOQgMkO4bXJ/AgCa/S+DjNZIPgve3tztvz8BQUnxoOtFhLEqyWfwNp0jfORmVe5VJQWrExKbX9+9dJ2yxfB6ewn6VqtNW7kCOfh8W7gODIKMO3hM0+g5Xws51FKBHOwuJ5EojY39hROuWlRfgRyOH97E22qNbWEHZIT7G/r+D/n+4TQRa8B/kvpzjBrBCDkAAAAASUVORK5CYII=",
            blank: true
          },
          {
            name: "Userstyles",
            url: "https://userstyles.org/styles/browse?search_terms=%s",
            favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABqElEQVR4nO2XsWsTURzHP99fLoPUSWjqaOnuEBK6iA6ucQuVdHCw1Ek3d59/gasIrhlCECSugohLJVzR1SFjbAqCiFN793PxGlFj9WzvLf1OB/d77/N5j9973IkfEjzYs93PG3I2cVpAw6HGgrxvPRLAtHPFF9VIyoAZ+Bipv9K8PlAI+dH74uHyu/urHGRDoLlosjICvzFKhboXR68nAFbAdZjt/Au8dNyb7r7z8cbVVQALHoyDbOjO8qnD5xbLjg89BLPnu19uUsXKf3Hw5l76csNyz3uVw+cSm/a92yNFLQMa8QRo2J/O+WnH3WsWC14kOYlJDEJUgZUXbx5GFWg/mVyLKuD54auyY6M34ZnAmUCCFGIK6PiS49N6/OHvP8l+SvL16YUHZQcvbX0qfQMeCeRe/h4H/lsgehOaRBYLLikzXLNYAg4zA8axBISPzVE/loBLfTu/dXcgKa2cLqWd7bWBSSGv1ZMu0n51cPbNkm6QcgM4d2tvktST9Up2QkrN6utvty/Nf04LiaXb99pgPaGR0PQkjqikDGkqMcLU69xZaxdwgG83NodGaQLg6QAAAABJRU5ErkJggg==",
            blank: true
          }
        ]
      };
      engineList_plus[1] = {
        "status": 3,
        "version": 1,
        "engineDetails": ["电子书", "ebook_xin", true],
        "message": "由奔跑中的奶酪整理",
        "engineList": [
          // {
          //     name: 'jiumodiary',
          //     url: 'https://www.jiumodiary.com/$post$q',
          //     favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAABi0lEQVR4nJ2VsU4CQRRFzy66GCtLrWysjMbEyi+wNFHBmGDpH1jYWJtAq5WxpoFEorXxB6xs1CBBI4WJVhpNoPBayMAuuzOw3FcwvMe5eTOzy0OYIGCHMk3ayBJf3FMmTxCieotN6lZwMOpsRQzIUBwZNlEk0zdIjwtR7BqQGwsXIicg4HVsgxYBFGzlGS1pepjFHlSSCiUZ/ehQS9rVerJB1eOZeUKapINNXjz14jMbzdhxWImn5oi2dCa3FuObCH85HoJL0o3mIgYeMt0o3qBVbaZ659LlfpOOyCHza5/ewsPjKJXJv0L7ORjhDIwSDnGi+/kxAv6QfAsIvY+At5SxGSxbkEshtKqanpS1PwcmGgN4xfE6hZ4DowXqlitLkh9PlVJe42e8rYvIBr4dG6ANj0mF/ZBBw2Xw7HOX1NY5Hlfd9b2r/1ufmq22gcc18OYyqA39U53Smr3aIosg7zJwRt4MltJYeEn0R9tJavw0NNqEYDvVcM31uH6WgAJVmnSsYIcmVQrh8f4HufpcPqh3SFcAAAAASUVORK5CYII=',
          //     blank:true
          // },
          {
            name: "forfrigg",
            url: "http://forfrigg.com/#gsc.tab=0&gsc.q=%s&gsc.sort=",
            favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFQUlEQVR4nMWXT4tlSRHFfxGZee97VdXaOroRBuYbCLpwIaMtbl26Ety7HETQxegX8A8uXLkVP4AwMAgiyKCCqMwoCuKgojjWOI12t1317s3MiHCRr9rpnq56U90LAx6XR76XcfJEnBM3JSIE4DOf/9IL6Y2ffuve2Y6LyCmRn7vF04aKnIvw4kvf+8a3H12TiBAR0U/futU/9fzH+N1vXuPDH/kob56e8tvXfs1nv/JdTDMybZimmQCSCN0DiWA7ZwDWZuSkuEE1Y8qJtXUc+Nvrf+DVV37sL3//m1NE+NsB5ItnRPCn1//I7dtv8de//Jnbt98C4Pf/+A+hGc2NMjdUhGrGunSmOdOqkbPSu7OZM0vttOZMRUmq7JbOsx98jpKT7vPVh9h55Dm+qCIiAIRDb8E8JZII5kavDiIUVUpO4+QetOZYD25sC/OUWKshArUaIvqOPJcCeKhGCtOcuH/ecIIIcAIBzpZKSoIIEFBbZypK92C3jOQi+/VL8lya+CLWarQ26AVwBxxKUXJSlrXjBkiwmQvzlDk7b8yTgkBrRsTl++fLl/YIdX88oHdn7UYQrIuBQskJc8Mddkuj5oQq1OpMKdHE2WwuT3OQARVISVHAAsKCpON0SZXWjW6BR5BzorcOIkgSlto4OS7Uak8OYLd0rAUhMGfh5o2ZIPAY/eEetOqEQ107200ZElwac8ncvbcOwJfEwRLklEhFqatRNoV791dKSeRkJBGON4W1GggIwm7p5KxsN4XajHnKXJTwiRjo3tktFSMwC3IRWuu4D4nulqGOpEJtxnaT6N1Y1g4hIOBP04RzzsxHE0uH6UgokanitO4jcUrjJCIcbTIEnBxPuAVLNVRGoz4xgJITZpCTEAFrdcwckSBrwnHMRj/U1QenaxCM/4gIu6Veuv/BEpwtjbPdikdQu9PMSVmYS2K3jnqHBOFjXYDaHLOg9+B8167c/7AMFTZTZlk6WYWswhgnylwUAqaUEFGmSShJOd4WFCEnmKe0b8THx2EVqGI+ZoGKoCr05qzRcGNvw0LrRm3BWV9JIsxTwh26Ofo2L742AE1KUqEFnC2dpELKwpQTZ2vHHMw6qso8Cds5YR7kJKzNqdWxhyfw9QC4GVOZmEomNOPuRATNgqJK7cZcEq0HhLP04HibaT0oScknBb9ChwcBIEK3YLHG0VHBI8Y7QbNhQONHlCQESgnHA5KCuUOMGXJZHGxCsxhzwIKIQBDOzitTVt57Y0JEhkSB3hxNym7XHshQk1zpAwcBjLnfuHFUEITejZIT1ZxlNbZzQlVQgXmTEAm224wA988bEXBFDx4uQVLBXHCH5n00ZRLqOvzfHTSCtTllEnDoPijPOdFteMITM9B8jNnmTk46qO6BxTAfGVZAKcK6Gr075mNkBwEB7k/RA0rg4eNkFnh3WjOyKrI3JXNHRJhKIgAJwczJ+9LkdzULvPG+9z/Dm6dvcOM9N7lz59+oKh965gTNE5pnQhKigvcgZYEQLIb9XkhN9i+IIkJE4A7JlsMAvJ3zq1/+AoCf/+wVAMrJB7C/v8rjSni1wz8c5+s6WLwKQN7exOoOLVsAnv/kJ3jxq19jXddrpHp81O584ctfvxKAR0QNb5OvQ8M/+eFL/OjlH/Dsxz83Zq0oSALNoBlJGUll/5mQVNBckIs1/V/d651T1rWeAu+g4QEA0/k7mpYXvC0Ko7Onacty985TMxARt+/+659ffByAB3dD4AQ44t3Y8/WjA+fA/UfvhnJxO96DyAxpHpTnNWJ/laE/mvwhAP+v+C9sz+VdwyQu0gAAAABJRU5ErkJggg==",
            blank: true
          },
          {
            name: "威锋网",
            url: "https://s.feng.com/index.php?srchtxt=%s",
            favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIAAAAwAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAsdJREFUeJyNkl1IUwEUx3+73nbVTV13zaZlsw8VIyvbSkiyeimjHtKHIkSiwCAwhIiIoIceCqJeyqIg6qUoiIigDyOKCsUinPmxMpZmpubH5pz7crve7fZQSSuIztvhnP///M//HN3zL9OaMqOyUtaRKxv4n5gKK5zrCeAtkhEe2lJ5sMTIoX4NZ6/nvwhudI0x5ZhHToaAYALMAlhLjZx+rxCORP8JVtU4LaMxxJ+58HvRF5fodvUAEI6pOIciPOkN0eSa4ONwAABRTGHu2DdGxsEPiH5ABXxe8LU5mb+mmFa3l2tBA2ORcQDMjnymvbD46SgNjgzqNy9k3/kmJjZVoNvRltDiMRh69pZdmR/YsGUbjQYrEXczL2r2I5ksrL90hsRMFGlhGYlOH9e3zyUUDPCs+R26xptPtGHPJKWLjJSXr6ehSyTDnsDVeI3RVg+WiloE5Q0dZ0+w/dVTJOsKClq6ObWn5MdK9TVbZz1ock2g5qXzYGslaeZlFNbUIWWm4r7dTn71cbKLlqDMgRa/Ad9UCDnLmGxi50iALJtI6eF6YgEV962rtB6tZdIdYu2RGkyZ6WgqqFIqx+5+IpZg9hoA6AWJiA9K9uwkz74O5+V7yGuqkB12gsEp/AGJRDydeGCadr2e665gsgJ7joC/L05QA3NhLvLyfLKKV2GwptF74y2Pqg8w8nKQac84WTmZdAz6kgkcS+eR9vELk1/B3eam8/wVoqMfSLPEsFWtIkU00n32JOEBJ4piZnN6IJnAIIkcWR3B8/gzfXe6AcguL0M0yuizC5Hte8mdb6JEjlJncrN70wp0mqZpf77roxdOTly6jyc4g6WiFoDIwHuqlic4XFuJxWya7U0yMRJVuNA8TI/OiliwGke4n4MbFVL1IrYFG7AtyPlzVrKCi68H6SnLQxIgFIVPj72cW6lhX2b5C/grvgPjZxiC9n+r/wAAAABJRU5ErkJggg==",
            blank: true
          },
          {
            name: "我的小书屋",
            url: "http://mebook.cc/?s=%s",
            favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIAC2AQAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAX1JREFUeJylk7Gq6mAQhL8NtxMDAdu/DphKUvgCQdKr8SG08DFSWsp5gxT2FrGNIAo2thY2lkqKaKHurY4ajxzk3oGFhf2Zf2bYFdd1lf+A9d2ICO/6jwlUH0Ke+98gIvx5NzDGEEURnucBMJ/PSZKEPM9L71QVec3AGMNkMsG2bbIswxiDMYbNZkO73S4RnE6nsgIRIQxDbNtmOBwynU4BGI1GhGGI53ksFgvyPKcoCm6324NARFDVu8woigDIsozBYMDxeCTPcy6XS9mv67r6Wl9fX/qM5XKpURSpiPysd3twvV6pVqs0m00ajQbdbhfHcWi1WqRpelcMlDNQVfr9PvV6nV6vx3q9BmA2m5EkCb7vk6bp3S487cH5fGa327Hf7wmCgPF4TBAEBEFAp9MBYLvd3j8qZVCr1VRE1LIstSxL4zjWV8Rx/MO/ZVkqlUpFi6J4jQHHcfB9H4DVasXhcCjNvzMQEfnnYxKRRwYvrB8RqGr5GlW1lPAn+Asf+sooQi/6SwAAAABJRU5ErkJggg==",
            blank: true
          },
          {
            name: "Library Genesis",
            url: "http://gen.lib.rus.ec/search.php?req=%s",
            favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADfElEQVR4nM2XQWgbRxSGv5SFncNSDXQhexB4aQUVRhARDBFOwSEt2PRSU3pI6CFJL8mtLTmEnEoOxYRSQm/pLaE15FCa9NCSQy+FYmQwRQFTVmCCAqJsQIQR7GEWBtrDaFeqsaVdieI+GObtaPa9f2b+9+/o1KtXvb85QXvtJJP/LwA4ZSbv7Bsu33mEEIJACgJfUl+SrDVDLja9uQCcKsuBW/f3ebD9G3gC9Hg8CCs8/uoSb/qmFIDSR3D3RgNZPW0fPEDYFkcv+Wa7XTbcfBy4sBKCBikrBIFtSMHTvV7pWKWPYNJel9XcV0oT9RXL1XJHUJiEz2OHXqyIlUYbjdaA6ZMaS4SKZ0mplGC1UZzbhWaeufYDcX9oHwxgtO2zt3NfWE44sPXpOp9sVI+I9m8rdAQ7keHy7UdonYJwbcIMfpbcpIBr/SRFBhW63300E0AhEq7WHe7d2rBlZwBS+0PmG8Bxx2MCtNZHRJoTAMCHLZ9mawl0apOZ1LYESFIYDG2v7VgYyEJxSynhlXebdJ5281VKv0IYSKQnEA5oA/FAEUUv2VyrF4pZugy/eLC/kPQuDCCzP/sO8cCWpUo0w0QjRvvpCoEUEPhyJtCZR/BLO2E36tHpxvQGGqUUOhkRT2twxHhyXhHjcem7PL539ViBmroD17/e48n3u1bzHWGDZ5Az1h9ejjnUD4a03nmbn7beOzLH1B349uYKwRuC+9u74LnjWp80M1kV2VgGwgVP0IvVsTlmluGdqw1ufHwOBlnyUfnlySdAOIz6CbHCVsfcADIQuQbAeMWOa0GJETCyXZoAZCD05WIAALauXxh57pgLJp0QIcYA9chPUhhoNs6Fx8YtLERnaw71xhLRXjcnpAwqNGsBzbcClqqS0JdIKZCeQCWaqBfzoq/4/FJtcQAAV9brPEw0G2t11lshZ2tHvW7Y2Y9ZbXgsV33AnxpzoQvJYfvx9wEPf+7Q/rXLZzfXuT1l5ZmV2oFJex479AaKZwcx7WcxnShGxUMb0RMoVexrWBjAX8rj2pdP7I1Ia5QaES9TPYHVCgdQKULMCFgWgEo0nb0XNhHYMvMgr4r8nmA1YG0lLBS3cBkuVw1B7TRkWzspRnp8DyAesrl5houNYl/LUiT848Bwd7tNdBATJzpXO+kJAl9QDwM+OB/yfms68+cG8F/Yif85/QdlMHLuJQQjHQAAAABJRU5ErkJggg==",
            blank: true
          },
          {
            name: "B-OK",
            url: "http://b-ok.xyz/s/?q=%s",
            favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEN0lEQVR4nOWWTWxUZRSGn3O/+W3Lj7VtaGlri1UUBEy6IPEnRBMTiYFVW6MmJmDUGHDjlo3EpRsTDQmJUSORhYCYYnDhQkCNhJ8FhM4ChKFUBEMJUjrTzsz9vuPiOkOnc6ftlKILz2Ly5TvvOe97zz2578D/PaTWgp7D5+PxTKxXPdoEbUc9dWovR9T83tjceeboc+IvuIDH96U3esIWlD5EZqlRpyq7UftFauDhE/cmQFWe2H+lV8X9CNIwF7GlUrgRcaw/O9CVnpeAtQd+a7EaGQFitRBXCFH+Wqxe2/GBzomwvBd2ufLb4TbfmV33Sg4gwtIxse+v/fJafWh++kWwZNGJsHetxR+pLJwpB6Cq2VR/d4WIigkkMtHXiuRWwVfFE0gYoSluaEka6iMSEN7lpCHi0ZI0NCUMES/I+6o4LU5C6lZ9PfzMjBNYvT/9Ccg2gJgn/LK5g4SREmjCKqpQFwluPjs/RmvSsLGjHqeQ9R1RT4ibIO8UxgqOpw+NIMEUfFS3pwZW7C5yRsrHJP0ioApL4x5JI1wcKzB4ZZw/sparGR+nyprGOM8uS7L10cUAHLw8zrHrE4xkfOojwuoH4rTWGV5sr6c5YYh5QsEpIhJR4U2gUsCaAyPtTm1LcaweglXlw7O3+PnP8gU+dyvPngtjpPq6uJmz7Dh1E2/KLE+P5gDIW+WNlUvKxixI70OfpxPDW7onYcoOOLXrp7+fqhsFiAhOFasaDijWh0Rysekpnj2A3sGrdapsm3uL2hDTwzj7VpmAfME1gnbW3GmWqC5NHuk5fD5eEmCt60JYtuACqikQ7TH5+IMlARiNCWJCsQutCkAlavJ+pCRA8O4o5EKx90OAaCaGnSgJUMst0PH7wVUlbrrJRdmSgNRQxyVROfrv8cuhs6+3ZkoC2ClOhV9nK1OCr2S1nNPq+XKwniweS1/CzB39tGGRfDwV5wEvLK9jU2c9jf8YkRG4lrWcHJ0MGgjseLKRtY0xmhIG38H1CZ/RSUtzMnSvGervPlI8TzOjyzkgpkBzwnDkpfaywpwN3C051Q0VPAmePmcD5yyaUTHWfTOMvTuZ60N9Xa0VEwBw6Mse7BGkYXTS8tTgCDmnZH1FUYq+qChLooafNrWT9ZUN3wW4qXlBWBQVBCmRK5p2YjZP5SwTUKgrfB/Pxr4C3ga4XXAIEDxQuaWMFxzvHb/B7bzDV4hIeR4g4yugpUpP5aNUX+c5KpDTYtW+9EURWRGWm3cox4b6uzZMvw79T6jCu6qMLCD9Cet5tZvd6n3pHxCeBwkVOmsoOYS9Q31dW6tBZmwc1cKrKB/Mj1wVZXsiFt0+E2xOXtO7+1Q009S0xii7FB4TWBLKCTdE9YyqeSc11HGJneJm612T2a07mF6a93WlIK8g0iFKmwqKckUg7am3N5YwF09vXp6tpe9/Gn8DQrStezS4ePUAAAAASUVORK5CYII=",
            blank: true
          }
        ]
      };
      engineList_plus[2] = {
        "status": 3,
        "version": 1,
        "engineDetails": ["网盘", "netdisc_xin", true],
        "message": "由奔跑中的奶酪整理,https://www.runningcheese.com/resources",
        "engineList": [
          // {
          //     name: 'jiumodiary',
          //     url: 'https://www.jiumodiary.com/$post$q',
          //     favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAABi0lEQVR4nJ2VsU4CQRRFzy66GCtLrWysjMbEyi+wNFHBmGDpH1jYWJtAq5WxpoFEorXxB6xs1CBBI4WJVhpNoPBayMAuuzOw3FcwvMe5eTOzy0OYIGCHMk3ayBJf3FMmTxCieotN6lZwMOpsRQzIUBwZNlEk0zdIjwtR7BqQGwsXIicg4HVsgxYBFGzlGS1pepjFHlSSCiUZ/ehQS9rVerJB1eOZeUKapINNXjz14jMbzdhxWImn5oi2dCa3FuObCH85HoJL0o3mIgYeMt0o3qBVbaZ659LlfpOOyCHza5/ewsPjKJXJv0L7ORjhDIwSDnGi+/kxAv6QfAsIvY+At5SxGSxbkEshtKqanpS1PwcmGgN4xfE6hZ4DowXqlitLkh9PlVJe42e8rYvIBr4dG6ANj0mF/ZBBw2Xw7HOX1NY5Hlfd9b2r/1ufmq22gcc18OYyqA39U53Smr3aIosg7zJwRt4MltJYeEn0R9tJavw0NNqEYDvVcM31uH6WgAJVmnSsYIcmVQrh8f4HufpcPqh3SFcAAAAASUVORK5CYII=',
          //     blank:true
          // },
          {
            name: "百度网盘",
            url: "https://pan.baidu.com/disk/home?#/search?key=%s&vmode=list",
            favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAGQUlEQVR4nMWXX2wcVxXGf+furGfX63jjxnVsJ5t1mj82LnZIIWmbBJWiJkUQUCuKkIAHSJEoCip9KilI5RFeUOEhRUCDKoJAvCAhEHH+NE2ryg1piKFt3Nq1izfJ2vHW2ziJx/bszNzDw9hJEzu1oVF7nubhfvf77vnOufeMALzZ18fU1FRyVS53v+u6u13X3YJIBlXhZoSIour5vt/t+/7eM2fPHkyn00FbaytSKpWY9v3aZcuWPeZWVe1OJBINN4X0BhFFUcmvVPaWy+Wfp1z3EoePHHE8z3vSWlvRDymstRXP8548fOSIQ7lc3hmG4fkPi3w2wjA8Xy6Xd8rExMSBTCbzuf81lVYhjOJvJwHm/6gWz/O6JAiCccdxsosFTfhwqmA5OaS8PaYA3FYvfLJFuGOVYUlq8QLCMLwoQRCEjuMkFgM4OWTZ3x1xcsgyFYDG/IhAKgmbWgzfuDvBptVmsQIiCYIgchxnQcTxgYif/C2gUFYSBtDYBphJv0BkIb9M2POFJHevW/hMYRhaZzFKhy8oTx2oUChZEgY0hKUZoaXeoEBhzDLuKQmBQgmeOqDk61M01y1cGIsS8Nd/Brw1HGIAscK97Q7fvKeKVfWCKpwpW559ocKx3hCjMDBi+cvJCt/d7i6494Kpn/SV4/0BYWCJAktbk/D4l1w+njPUpoVstdCRS/D4F10+1miIAksYWP7RH+L5+sEFeNNK+WKEWEVUuWttgobaualdnjXcuTYRr7Mxxpu+CQIiC0ElIopAFBqzN/Z1eS0YtWgYZyGyC/LPXwOhhcGS0nMWCmNKMrjEtvETnEm28J9iK4rL9TIUGByJCFUw6SSeGH53XMnXKxtzsKZBmK/X5ggYGYd9L1leGlBKl+NWS1Y1sdmc56tDv+Sdo/cyuuk7NLZc+2b1FS0vn0mQyNZgHIMH/PEEGGNpWALb1goPbzM0LX0fAWffhZ/+3fLyQOydSJz2gCTTppqGcJT6N/7E2Z+VGPraHhrXNCFq6T1n+cMrhuLlZNymNhYugFgojcOfTyoj45Y9nzfkbplHwHQA+16wdPfH/awKdTWwfjnkLp1my+mDWFUwBvfV5zk6Usdzax8hSqYYs2nCRAIjYC1k09DaJCQM9I0oF7z4MN39yr6MZc9OQyp5nYA3h5VjvYrR+AQbW4Td24X1jZAK8nibv8/wr39BMHgaY4TNF57jxXOfodC4hap0EqMxeWsTfG+7YUNeEKD/vLL3sNIzpBiBY73KA3con8jHVWRkppr6hmFiErBwaw08ukPYmBcyrpCoWULtnVtZ8chjJGrrQC2BU006myGZcsGCjaBjhfDjBw1b1ws1LmRc2JgXHt0h3FoT7z0xGXPNWmwgTnexrGgUX7PtzUJb89x2y9zeSWpljnJyOftv+yH92U9hIotG0LlS+NED8+PamoX2ZkFD0GiGS6+zwNpYIRqrMvO0jABj6Ry/z+/iX9l7kEixCp154YkHhfVN898Rxsyc1Mab2PfcD2Y2FY1ZQSzxXV5Uhkbn3mLnipM863ydnrrPxuQRdOaukk9VoBLOFTA0qgwU4/oSO8M1o9WZTUXbCshUwaQPxTH4zUHl2zsg3xA/OIPnlV8dyfJKcAvGxKfY0CI88WVhXbPQ/Yay/5jSVAcPbRXWNMYkhZLyzCGlOBZnsNqNuSC2/ooF7TlhS6tw6FT83j//b+X1gtKRFyILrw0p5csOAtgQOvLKnocM65qFix48c0jpGYyx3b1KR0vchq8VlHfGY/LIwpZOoT131aorAqpd2HWfUByD00OKMVB6Fw7PjF2zNWEVNqyGH3zFsH6m4NwkNC6N7ROF8kU42nMdzsLtLcKu+4Tq97zSc0ayt4rKvoPK8V5lYvpaL2ur4dMdwrd2CC3Lry24Qgl+22V58XXl8uS1uJoU3NUuPHy/sG7FVdzsSDZnKJ3yoWdAOdGnDA7HI9e6lbC5TehcLaSqmDemK/Dq2zGu/1zs8Zpm2NwqbFwrpK+bT8IwvPi+Y7lVCENAIJngSuUuFKoQRICC49x4ZPc8r8v4vr83iqLR+RYYgaokVDmLJ4d4bZUTY29EHkXRqO/7e82pnp4u3/efVtVg8RQfLFQ18H3/6VM9PV0f+c+pwEf7e/5fM4zdUv6k9qAAAAAASUVORK5CYII=",
            blank: true
          },
          {
            name: "盘多多",
            url: "http://www.panduoduo.net/s/name/%s",
            favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIAAXAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAd5JREFUeJylkz9oE1Ecxz+XnpKUlPxZEq7DDVeog1wU3OQKdmgnERoIUlFnNXQQdBHd4iJ0URRcWiWjLnZKN1O6BfRCF6EHZvCMCEkvf3yRNH0OwcPzkkW/y/v93u+97+/3/b3fU760B3IuOsO/oDsYoSZnVWZPhwnKlRpHPUExb00lmIkoqKMTGdj0eoLCo228vuDBjRXqjhuIm4bm26MTifo3a9V28PoCK2dw7/m7UNbimhWoKkTQaLYxjXme3L6Cnkmzs39AZfMWAGeuPQ4Rqn9e9PqCuuOiZ1P+qmfTIRl1x0XPpIiop1A6Yijnoiqrd1/Q+NYOZZiG66sX2CgsQ0cM5W98/tqSi+sledT9IaWUsvBwS77/eOjHF9dL8umbqu93xFAGerBnO+QMjUQ8BoCVMyi92oWbK5QrtYmVBAjMBY1EPOr7xbzF5Ytnxz05dEnEo5gLWoDA7wHAs7d71B2XRrM1tR96JuW/SndwHH5GgJf3r1J6vYtpaCydG8u4k7fweiI0G5GJWbIpqrYzlmVo2I5LMh5Dz6ZDZ5WOGMoPnxqUKzUazRZeX2Aa81RtBz0znoOq7bCUMwB8W8+m2Cgso/R/HsvvrQ47+wcTNU9DMh5j7dJ5lP/9zr8A5hvhBGvOuq4AAAAASUVORK5CYII=",
            blank: true
          },
          {
            name: "56网盘",
            url: "http://www.56wangpan.com/search/kw%s",
            favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEbUlEQVR4nMWXaUxcVRTHf28WmM4MW1kLgqVQiqEVBNtKhagxVdCorba2JhZIjNZooo2p1ETbfrGNS+uaurbxg1ZNI9o0ktbSpI1RA4TSsLVICUyFsA7LwAwzzMyb5yce82A2QOL/09xzzr3n9+56RuB8hcT/KE2ogXFaI4/G51IafyfFMVlEa/XYxGnqx7uoHm6meriJfxwjCwYQgs1ASngMhzIf59nkQvTqcL9xLo/IuaFrHO78hTZr338DsDtpMydy9rBSawh5QIfo4uDNn/nA9Bsegq+uyp9jf3oJ3+W+4DO5JEm4PSKSND+BTq3l/exdfJZThgohKIDPPVCefC/vZj2NSpgdQJQ8nB9u5nR/LQ2WbsZdUxjU4eRGprEz6W52JG1Ep9LK8XtT72fEaeXNm1UBAeYtwTpDEg2FhzFqdLKt0zZIRctJ/hzv9DtQtmEV32x4jnuiMxTQj1z9kIvmVr/95i3BsXW7FclbJ3spqjsaMDlAu62fB+vfUyRTCyo+yn4GraAODeCuyNspjd8gtyfcdp66doJB50TA5DOa8jjZ3fQF3VNm2XaHMZntifmhAexJLkQtzJqOdV+gY2ogpOQzGnPZONBxRrFBy1OKggMIwEOx62XHlOjky54rC0o+o7ODjYpLqTgmC70qLDBAlEZPpiFBdly1mBgKcernyiWJ1Jjb5HaERkeGPsFnrAwQG2Yk3OsYtdtCv8186fqc/im6mMAAc3eqVZxeEoDVreyvEXzfebLV7nEqNs5KrXFJAHFhyv4OjyswgNlpxeb11XkRqUsCyItMU7Rv2X2/lDKATZymebJXduREpJBtWLWo5JEaHVtjc+T2wLQFk93sM1axMNXDTfJvjaBmf3rJogD2pj5AjNcjdtHciksSgwN82/cXdtEpt8tTing4bv28ToGUbVjFWxmPyW1JkjjZ+7vfeAVAj2OUU17BGkHFD7kvUuj1wATSmhXx/Fqwj0jNCtl2caSNP8Y6QgMAONR5llte6xWjNXBpYyWV6aV+bzOtoKYseQt1hQcVF47FbeeV66cDliU+K6LNUWu4tLESo0ZZgvU5xjk71Ej9eBfDzkmitXryItPYlpDPWkPivMGbJ3vYUntEcbpCAgDYGpvDmbyXiNbqA/AHV9VAA7uaPkeUPD79fkuympE2ttS+Td14l8/Sy5+kORP+ZFIB72Tt8BvvFwDghq2forojlLV8TaPFhMfPV0iSRIdtgH03vudjU43CJyDw2uoSnr/tPp99g5bls4GQqU+kMDqTTH0CERoddo+T7ikzdZYu2iZ7EZFQCyqq8l7miTlFyLTHTWnDcS6Pti8OYCGKUOu4vOkABVGrFXaz00px3VHabf2yLeASLFaTooNt1z6h1zGqsMeFGTmX/ypxXg/dsgAA9DrG2N74KVa3Q2Ffa0jk9fTS5QcAaJgwUdFyCvecdyDZqzhZVgCAqsEG3vj7J/koi5KHH/trZX/I/46XouOmCww6LexM2sRXPVeoHm6Wff8CcSai56TwP2UAAAAASUVORK5CYII=",
            blank: true
          },
          {
            name: "Pan115",
            url: "http://www.pan115.com/search?key=%s",
            favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB40lEQVR4nO2W4U0jMRCFvzlRwEIHkA6gBG47SEqASC6AiBKgAEtHB3eXDgglkA7iEpLtwPxY7zJr7GRvtSJIx0iRdsaemWfPeF7gfxcZ4uQtv8LnBnBiWA4FcDLQ71Z9L8NvXADecpFZmkb67z17WxGDS9r3AHgGfh4K/A9SimEVG3+MmGCQ9O2BJbBQegH8Dbb1Hr/NWAC2uobesgEuAoilGGYpJ28PBx5aAl3Lqbfs+jTiaADEMAdKoAqmgoENewLgLQVwFq1pvUqc0AHX1GVYA6sDt1Do9aakEgDcQjvdPkNWYijhCz3DP3QbqwBelT7j/bk13e+AG977ICX6GeoYrSQnobfcAQ9BrcRwqtZ2AWAjCzE8ZuJ4pSYn4Yc5EBrlXplip3PgBbgM+oO3lGIooyaca6dUcohuIAR4pXvCSYpI1C1VwBWwBXapJMBaDFephbYJvWVKXTOdfJ5lsfraJ8BMDE4MFST3OkhPSuiWYE19mgbAkxieco4BhIuSltGWbQCWj6GVqAR7HQfIKsUZnSYUg/OWBfVQKkYGkIzXhw2rTJA+9mzivgDakQkdGiaaDfrf06x5cn1G/NFH8dEBpOh4otbPchQb2TV1a9rNxjo2HTsxNbivUQI+0vG3fJq8AbQYmOhoQk+aAAAAAElFTkSuQmCC",
            blank: true
          },
          {
            name: "胖次分享",
            url: "https://www.panc.cc/s/%s/td_0",
            favicon: "",
            blank: true
          },
          {
            name: "小不点搜索",
            url: "https://www.xiaoso.net/mod/app_search?wd=%E9%92%A2%E7%82%BC&mod=app_search&oksubmit=true&okbtn=XiaoSo%s",
            favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABd0lEQVR4nKWTTytEYRTGf+e9d8zcmZEFGzFLZWE1kW9gY2fHyiyVfAAUG7KULLGzIR/AAqWoSUqTjaKwoFBkmubPnfu+FlfjXi4z5SxP5zzneZ5zjgzl9gz/CBWZVIIxUHU9XE+jlPwKYH9P1Oqawb4u5iezZLrT1LVh/+Seha1zEnELT4cJS1BCqeyS3xgjmbQRAPEna22wlDC3nufw4iEE0pBQqXmcbY6RdGyUCCKCAAJYnxKWpofp7UyhRMIAlhJGhzMkHPtPvQC7KyOUKm4YoOpqZnNZ/JlNQiAV/7LOB6h7tKfbkBb6AZyE3ahVQEhTK2ECi1AATpvF+eUTWrd2U89v5QaIAt/pmdXTpgZqbShcvZByYmEGBvAwrG0X0CaahdYGpYTxxYNQXgULto9umFo+/tFsDNw9FBmY2CEdmA7fLhH8P3gv1ejqSNDf08Frscr1YxHbVpFb+vELWhvSToyq61G4fcUAsVjkz0UDBGkbmm/lA6vHg4K5ek21AAAAAElFTkSuQmCC",
            blank: true
          }
        ]
      };
      var settingData = {
        "status": 1,
        "message": "$相关说明$(status: 这个在将来或许很重要)...(version: 若有新功能加入,靠这个版本号识别)...(addSearchItems: 允许更新时,添加新的搜索网站到你的搜索列表)...(modifySearchItems: 允许更新时,修改你的搜索列表中的项目)...(closeBtn: 设置页面右上角的“关闭”按钮是否显示。true显示,false隐藏)...(newtab: 新标签页打开。0为默认设置,1为新标签页打开)...(foldlist: 折叠当前搜索分类列表。true为折叠,false为展开。)...(setBtnOpacity: 设置按钮的透明度,值为0-1之间的数,0为透明,1为完全显示,中间值半透明。注：-1为直接关闭按钮,关闭之前请确定自己知道如何再次打开它)...(debug: debug模式,开启后,控制台会输出一些信息,“关闭并保存”按钮将不会在刷新页面)...(fixedTop: 将搜索栏固定到顶端。 true开启,false关闭)...(fixedTopUpward: 固定顶端后，搜索栏下拉不会出现，只有上拉时才出现。 true开启,false关闭)...(baiduOffset: 在百度页面鼠标划过的菜单会出现位移,若有使用其他的style样式,可以修改这个来修复二级菜单的偏移)...(getIcon: 自己添加搜索后获取图标的方式。0为自动，能连接谷歌的情况下用谷歌获取，无法连接的情况下，域名加favicon.ico获取；1为域名加favicon获取，2为使用谷歌获取，3为使用dnspot的服务获取(不建议使用)。或者添加网址，关键字使用%s代替，未测试)...(allOpen:一键搜索，点击相关分类后，打开该分类下的所有搜索)...(HideTheSameLink:隐藏同站链接。默认开启,百度页面会隐藏百度搜索。如果想在同一个搜索网站,但是想通过不同语言来搜索, 可以选择false来实现)...(center:是否居中显示，主要是为了兼容脚本 ac 百度  ： 0 不居中，强制在左。 1, 强制居中 。 2,自动判断)...(icon: 图标的显示方式, 0 关闭文字, 只保留图标, 1 显示网站图标,2 显示抽象图标。当脚本中不存在抽象图标时,显示网站图标)...(transtion: 是否有动画效果, true为开启所有动画效果,false关闭所有动画(包括模糊效果)。)(selectSearch: 划词搜索功能, true为开启划词搜索,false关闭)(engineDetails: 第一个值为分类列表标题名称,第二个值与enginelist相关联,必须匹配,第三个值true为显示列表,false为禁用列表。排列顺序与跳转栏上的显示顺序相同，可以用它将分类列表按自己喜欢排序)...(engineList: 各个搜索的相关信息)(rules: 已弃用--将搜索样式插入到目标网页,同脚本中的rules设置相同,优先级高于脚本中自带的规则。自带了360搜索,可仿写)...",
        "version": 5,
        "addSearchItems": true,
        "modifySearchItems": true,
        "closeBtn": true,
        "newtab": 0,
        "foldlist": true,
        "setBtnOpacity": 0.2,
        "debug": false,
        "fixedTop": true,
        "fixedTopUpward": false,
        "baiduOffset": -120,
        "getIcon": 0,
        "allOpen": false,
        "HideTheSameLink": true,
        "center": 2,
        "icon": 1,
        "transtion": true,
        "selectSearch": false,
        "engineDetails": [["网页", "web", true], ["翻译", "translate", true], ["知识", "knowledge", true], ["图片", "image", true], ["视频", "video", true], ["音乐", "music", true], ["学术", "scholar", false], ["社交", "sociality", true], ["购物", "shopping", true], ["下载", "download", false], ["新闻", "news", false], ["mine", "mine", false]],
        "engineList": {},
        "rules": [{ "name": "360", "url": "/^https?:\\/\\/www\\.so\\.com\\/s\\?/", "enabled": true, "engineList": "web", "fixedTop": 50, "style": "margin-left: 140px;margin-bottom:-10px;z-index:3001;", "insertIntoDoc": { "keyword": "//input[@name='q']", "target": "css;#tabs-wrap", "where": "afterEnd" } }]
      };
      var getSettingData = GM_getValue("searchEngineJumpData");
      if (getSettingData) {
        if (!getSettingData.status && confirm("设置发生错误,脚本将会复原出厂设置")) {
          GM_deleteValue("searchEngineJumpData");
          window.location.reload();
        }
        for (let value in settingData) {
          if (!getSettingData.hasOwnProperty(value)) {
            console.log("属性不存在： ", value);
            getSettingData[value] = settingData[value];
            GM_setValue("searchEngineJumpData", getSettingData);
          }
        }
        if (parseFloat(getSettingData.version) < settingData.version) {
          console.log("版本过低,开始更新,当前版本号和目标版本号: ", getSettingData.version, settingData.version);
          getSettingData.icon = 1;
          getSettingData.version = settingData.version;
          getSettingData.message = settingData.message;
          GM_setValue("searchEngineJumpData", getSettingData);
        }
        engineList = getSettingData.engineList;
      } else {
        console.log("未发现本地列表");
        settingData.engineList = engineList;
        console.log("初始化：", settingData);
        GM_setValue("searchEngineJumpData", settingData);
        getSettingData = GM_getValue("searchEngineJumpData");
      }
      var engineDetails = getSettingData.engineDetails;
      var getDetails = engineDetails.map(function(value, index) {
        return value[2] ? index : -index;
      });
      var getDetailsL = getDetails.length;
      var details = [];
      for (let i = 0; i < getDetailsL; i++) {
        details[getDetails[i]] = engineDetails[i];
      }
      ;
      engineList.details = details;
      reloadDebug(getSettingData.debug);
      debug("searchEngineJump test location.href: ", window.location.href);
      function modifySearchItemsFun(engineList2, oldURL, newURL) {
        for (let value in engineList2) {
          var item = engineList2[value];
          for (let i = 0; i < item.length; i++) {
            if (item[i].url === oldURL) {
              item[i].url = newURL;
              return engineList2;
            }
          }
        }
        return engineList2;
      }
      function modifySearchItemsIcon(engineList2, url3, newIcon) {
        for (let i = 0; i < engineList2.length; i++) {
          if (engineList2[i].url == url3) {
            engineList2[i].favicon = newIcon;
            console.log("发现旧的图标");
          }
        }
        return engineList2;
      }
      function modifySearchItemsRuleFun(name, value) {
        var oldRule = getSettingData.rules;
        for (let item in oldRule) {
          if (oldRule[item].name == name) {
            console.log("匹配成功, 更新 rule : ", name);
            oldRule[item] = value;
            GM_setValue("searchEngineJumpData", getSettingData);
          }
        }
      }
      var parseUri = function(str) {
        var o = parseUri.options, m = o.parser[o.strictMode ? "strict" : "loose"].exec(str), uri = {}, i = 14;
        while (i--) uri[o.key[i]] = m[i] || "";
        uri[o.ds.name] = {};
        uri[o.ds.name][0] = {};
        uri[o.ds.name][0]["key"] = (uri.protocol ? uri.protocol : "http") + "://" + uri.host + (uri.port ? ":" + uri.port : "") + "/";
        uri[o.ds.name][0]["val"] = "/";
        i = 0;
        var tempsub = "/", subs = uri[o.key[10]].substr(1).split("/");
        for (var j = 1; j < subs.length + 1; j++, i++) {
          tempsub += tempsub === "/" ? subs[i] : "/" + subs[i];
          if (subs[i]) {
            uri[o.ds.name][j] = {};
            uri[o.ds.name][j]["key"] = subs[i];
            uri[o.ds.name][j]["val"] = tempsub;
          }
        }
        uri[o.q.name] = {};
        uri[o.key[12]].replace(o.q.parser, function($0, $1, $2) {
          if ($1) uri[o.q.name][$1] = $2;
        });
        uri[o.aq.name] = {};
        uri[o.key[13]].replace(o.aq.parser, function($0, $1, $2) {
          if ($1) uri[o.aq.name][$1] = $2;
        });
        return uri;
      };
      parseUri.options = {
        strictMode: false,
        key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
        q: {
          name: "queryKey",
          parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        aq: {
          name: "anchorqueryKey",
          parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        ds: {
          name: "directorySub"
        },
        parser: {
          strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
          loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
      };
      function getElementLeft(element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;
        while (current !== null) {
          actualLeft += current.offsetLeft;
          current = current.offsetParent;
        }
        return actualLeft;
      }
      ;
      function getElementByXPath(xPath, contextNode, doc) {
        doc = doc || document;
        contextNode = contextNode || doc;
        return doc.evaluate(xPath, contextNode, null, 9, null).singleNodeValue;
      }
      ;
      function getMStr(fn) {
        var fnSource = fn.toString();
        var ret = {};
        fnSource = fnSource.replace(/^[^{]+/, "");
        var matched;
        var reg = /var\s+([$\w]+)[\s\S]*?\/\*([\s\S]+?)\*\//g;
        while (matched = reg.exec(fnSource)) {
          ret[matched[1]] = matched[2];
        }
        ;
        return ret;
      }
      ;
      function eventSupported(eventName, elem) {
        elem = elem || document.createElement("div");
        var prefix = ["o", "ms", "moz", "webkit", ""];
        var l = prefix.length;
        var pEventName;
        var isFunction;
        var setAttr;
        while (l--) {
          pEventName = "on" + prefix[l] + eventName;
          if (pEventName in elem) {
            return pEventName.slice(2);
          } else if (typeof elem.setAttribute == "function") {
            setAttr = false;
            if (!elem.hasAttribute(pEventName)) {
              setAttr = true;
              elem.setAttribute(pEventName, "return;");
            }
            ;
            isFunction = typeof elem[pEventName] == "function";
            if (setAttr) elem.removeAttribute(pEventName);
            if (isFunction) {
              return pEventName.slice(2);
            }
            ;
          }
          ;
        }
        ;
        return false;
      }
      ;
      var data = (function() {
        "use strict";
        var cache = {
          objs: [],
          data: {}
        };
        function data2(obj, key, value) {
          var id = cache.objs.indexOf(obj);
          if (id == -1) {
            id = cache.objs.push(obj) - 1;
          }
          ;
          if (!cache.data[id]) {
            cache.data[id] = {};
          }
          ;
          if (typeof value == "undefined") {
            return typeof key == "undefined" ? cache.data[id] : cache.data[id][key];
          } else {
            return cache.data[id][key] = value;
          }
          ;
        }
        ;
        return data2;
      })();
      var mouseEventListener = (function() {
        var support = {
          mouseleave: eventSupported("mouseleave"),
          mouseenter: eventSupported("mouseenter")
        };
        var map = {
          mouseleave: "mouseout",
          mouseenter: "mouseover"
        };
        return {
          add: function(type, ele, callback) {
            if (support[type]) {
              ele.addEventListener(type, callback, false);
            } else {
              var listener = data(callback, "mouseELListener");
              if (!listener) {
                listener = function(e) {
                  var relatedTarget = e.relatedTarget;
                  if (!ele.contains(relatedTarget)) {
                    callback.call(ele, e);
                  }
                  ;
                };
                data(callback, "mouseELListener", listener);
              }
              ;
              ele.addEventListener(map[type], listener, true);
            }
            ;
          },
          remove: function(type, ele, callback) {
            if (support[type]) {
              ele.removeEventListener(type, callback, false);
            } else {
              ele.removeEventListener(map[type], data(callback, "mouseELListener"), true);
            }
            ;
          }
        };
      })();
      function getScrolled(container) {
        if (container) {
          return {
            x: container.scrollLeft,
            y: container.scrollTop
          };
        }
        ;
        return {
          x: "scrollX" in window ? window.scrollX : "pageXOffset" in window ? window.pageXOffset : document.documentElement.scrollLeft || document.body.scrollLeft,
          y: "scrollY" in window ? window.scrollY : "pageYOffset" in window ? window.pageYOffset : document.documentElement.scrollTop || document.body.scrollTop
        };
      }
      ;
      function getElement(selector) {
        if (selector.indexOf("css;") == 0) {
          return document.querySelector(selector.slice(4));
        } else {
          return getElementByXPath(selector);
        }
        ;
      }
      ;
      function mousedownhandler(e) {
        var target = e.target;
        target = getElementByXPath('ancestor-or-self::a[contains(@class, "sej-engine")]', target);
        if (!target) return;
        var value;
        if (typeof iInput == "function") {
          value = iInput();
        } else {
          if (iInput.nodeName == "INPUT") {
            value = iInput.value;
          } else {
            value = iInput.textContent;
          }
          ;
        }
        ;
        if (!getSettingData.HideTheSameLink) {
          value = value.replace(/site[^\s]+/, "");
        }
        var ogbk = target.getAttribute("gbk");
        if (ogbk) {
          value = toGBK(value);
        } else {
          value = encodeURIComponent(value);
        }
        var targetURL = target.getAttribute("url");
        if (getSettingData.allOpen && target.classList.contains("sej-drop-list-trigger")) {
          var list = engineList[target.dataset.iqxincategory];
          for (var i = 0; i < list.length; i++) {
            if (list[i].url.indexOf("site:") < 0 && matchedRule?.url.test(list[i].url)) continue;
            if (list[i].disable) continue;
            var href = list[i].url.replaceAll("%s", value);
            GM_openInTab(href);
          }
          target.setAttribute("onclick", "return false;");
          return;
        }
        var postSign = targetURL.indexOf("$post$");
        if (~postSign) {
          var f = getPostFormHTML(targetURL.substring(0, postSign), [targetURL.substring(postSign + 6), value], target.getAttribute("target"));
          target.appendChild(f);
          target.setAttribute("onclick", "this.getElementsByTagName('form')[0].submit();return false;");
        } else {
          target.href = target.getAttribute("url").replaceAll("%s", value);
        }
        if (selectSearchMode) {
          target.target = "_blank";
        }
      }
      ;
      function getPostFormHTML(url3, value, newTab) {
        var ospan = document.createElement("span");
        ospan.style.cssText = "width:0px;height:0px;";
        var form = "<form method='post' action='" + url3 + "'" + (newTab ? " target='_blank'" : "") + "><input type='hidden' name='" + value[0] + "' value='" + value[1] + "' /></form>";
        ospan.innerHTML = form;
        return ospan;
      }
      ;
      function selectSearch(e) {
        let selectText = window.getSelection().toString();
        let sejContainer = document.querySelector("#sej-container");
        if (matchedRule) return;
        if (e.button != 0) return;
        if (selectText.length < 1) {
          if (sejContainer) {
            sejContainer.style.top = "-50px";
          }
          return;
        }
        ;
        iTarget = document.body;
        iTargetWhere = "beforeend";
        iInput = {};
        iInput.textContent = selectText;
        if (sejContainer) {
          sejContainer.style.top = "0px";
          return;
        }
        ;
        selectSearchMode = true;
        addSEJ();
      }
      let iTargetWhere;
      let iTarget;
      let iInput;
      let selectSearchMode = false;
      if (getSettingData.selectSearch) {
        document.onmouseup = selectSearch;
      }
      if (window.self != window.top) return;
      var url2 = location.href;
      var matchedRule;
      var marchedSign;
      marchedSign = getSettingData.rules.some(function(rule) {
        if (typeof rule.url == "string") {
          rule.url = new RegExp(rule.url.substring(1, rule.url.length - 1));
          if (rule.url.test(url2)) {
            matchedRule = rule;
            return true;
          }
          ;
        }
      });
      if (!marchedSign) {
        rules.some(function(rule) {
          if (rule.url.test(url2)) {
            matchedRule = rule;
            return true;
          }
          ;
        });
      }
      if (!matchedRule || !matchedRule.enabled) return;
      iTarget = typeof matchedRule.insertIntoDoc.target == "function" ? matchedRule.insertIntoDoc.target() : getElement(matchedRule.insertIntoDoc.target);
      iInput = typeof matchedRule.insertIntoDoc.keyword == "function" ? matchedRule.insertIntoDoc.keyword : getElement(matchedRule.insertIntoDoc.keyword);
      if (!iTarget || !iInput) {
        console.log("脚本 searchEngineJump 搜索引擎快捷跳转 遇到了错误： ");
        console.log("目标有误：\n iTarget：" + iTarget + "\niInput(keyword): " + iInput);
        return;
      }
      iTargetWhere = matchedRule.insertIntoDoc.where.toLowerCase();
      addSEJ();
      function addSEJ() {
        let styleText = "";
        styleText += `
                body {
                    --font-color-qxin:#333;
                    --background-color-qxin: transparent;
                    --background-avtive-color-qxin: #ccc;
                    --background-active-enable-qxin:#cff9ff;
                    --background-active-disable-qxin:#ffa2a2;
                    --background-hover-color-qxin: #EAEAEA;
                    --trigger-shown-qxin: #DEEDFF !important;
                    --sej-drop-list-background-qxin:rgba(255,255,255,0.7);
                    --sej-drop-list-border-qxin:rgba(0,0,0,0.08);
                    --sej-drop-list-shadow-qxin:2px 2px 5px #999;
                    --sej-drop-list-backdrop-qxin:blur(7px);
                    --background-btn-qxin:#EFF4F8;
                    --background-setting-qxin:#fff;
                }
                body[qxintheme="light"] {
                    --font-color-qxin:#333;
                    --background-color-qxin: transparent;
                    --background-avtive-color-qxin: #ccc;
                    --background-active-enable-qxin:#cff9ff;
                    --background-active-disable-qxin:#ffa2a2;
                    --background-hover-color-qxin: #EAEAEA;
                    --trigger-shown-qxin: #DEEDFF !important;
                    --sej-drop-list-background-qxin:rgba(255,255,255,0.7);
                    --sej-drop-list-border-qxin:rgba(0,0,0,0.08);
                    --sej-drop-list-shadow-qxin:2px 2px 5px #999;
                    --sej-drop-list-backdrop-qxin:blur(7px);
                    --background-btn-qxin:#EFF4F8;
                    --background-setting-qxin:#fff;
                }
                body[qxintheme="dark"] {
                    --font-color-qxin:#BDC1BC;
                    --background-color-qxin: transparent;
                    --background-avtive-color-qxin: #424242;
                    --background-active-enable-qxin:#274144;
                    --background-active-disable-qxin:#583535;
                    --background-hover-color-qxin: #424242;
                    --trigger-shown-qxin: #424242 !important;
                    --sej-drop-list-background-qxin:#121212;
                    --sej-drop-list-border-qxin:rgba(255,255,255,0.08);
                    --sej-drop-list-shadow-qxin:0 8px 24px rgba(0,0,0,0.55);
                    --sej-drop-list-backdrop-qxin:none;
                    --background-btn-qxin:#292f36;
                    --background-setting-qxin:#202124;
                }
                @media (prefers-color-scheme: dark) {
                    body:not([qxintheme="light"]) {
                        --font-color-qxin:#BDC1BC;
                        --background-color-qxin: transparent;
                        --background-avtive-color-qxin: #424242;
                        --background-active-enable-qxin:#274144;
                        --background-active-disable-qxin:#583535;
                        --background-hover-color-qxin: #424242;
                        --trigger-shown-qxin: #424242 !important;
                        --sej-drop-list-background-qxin:#121212;
                        --sej-drop-list-border-qxin:rgba(255,255,255,0.08);
                        --sej-drop-list-shadow-qxin:0 8px 24px rgba(0,0,0,0.55);
                        --sej-drop-list-backdrop-qxin:none;
                        --background-btn-qxin:#292f36;
                        --background-setting-qxin:#202124;
                    }
                }
                `;
        styleText += `
                #sej-container {
                    display: block;
                    position: relative;
                    z-index: 2;
                    // padding: 1px 5px 1px 5px;
                    line-height: 1.5;
                    font-size: 13px;
                    font-family: arial,sans-serif;
                    transform-origin: top center;
                    animation: sejopen 0.2s;
                    border-bottom-right-radius: 4px;
                    border-bottom-left-radius: 4px;
                    color:var(--font-color-qxin);
                    background: var(--background-color-qxin);
                    // transition:0.3s;
                }
                /* 滑词搜索样式 */
                #sej-container.selectSearch{
                    position:fixed;
                    top:0;
                    left:0;
                    right:0;
                    z-index: 99999;
                    text-align: center;
                    transition: 0.3s;
                    background: #ffffffba;
                    backdrop-filter: blur(25px);
                    padding: 5px 0;
                    box-shadow: 2px 2px 10px #eee;
                }
                .selectSearch .sej-engine{
                    margin-left:5px;
                }
                #sej-container a{
                    border-radius:2px;
                }
                body[qxintheme="dark"] #setBtn img {
                    filter: invert(0.82);
                }
                #sej-expanded-category {
                    font-weight: bold;
                }

                .sej-engine {
                    line-height: 2;
                    display: inline-block;
                    margin: 0 0px 0 0;
                    border: none;
                    padding: 0 8px;
                    text-decoration: none;
                    font-weight:500;
                    transition: background-color 0.15s ease-in-out;
                }
                .sej-drop-list a:visited,
                .sej-drop-list a:hover,
                .sej-engine a:visited,
                .sej-engine a:hover,
                #sej-container a:link,
                #sej-container a:visited,
                #sej-container a:hover{
                    color:var(--font-color-qxin);
                }
                .sej-engine:hover {
                    background-color: var(--background-hover-color-qxin);
                    text-decoration: none;
                }
                .sej-drop-list-trigger-shown {
                    background-color: var(--trigger-shown-qxin);
                }
                .sej-drop-list > .sej-engine:hover {
                    // background-color: #DEEDFF;
                    background-color: var(--background-hover-color-qxin);
                }
                .sej-drop-list > .sej-engine {
                    display: block;
                    padding-top: 4px;
                    padding-bottom: 4px;
                    top: 0px;
                    border-radius:4px;
                }

                .sej-engine-icon {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    border: none;
                    padding: 0;
                    margin: 0 3px 0 0;
                    vertical-align: text-bottom;
                    box-sizing:unset;
                }

                .sej-drop-list {
                    position: absolute;
                    display: none;
                    opacity: 0.3;
                    top: -10000px;
                    left: 0;
                    min-width: 90px;
                    padding: 5px 0;
                    text-align: left;
                    font-size: 13px;
                    -moz-box-shadow: var(--sej-drop-list-shadow-qxin);
                    -webkit-box-shadow: var(--sej-drop-list-shadow-qxin);
                    box-shadow: var(--sej-drop-list-shadow-qxin);
                    // background-color: rgba(255,255,255,.7);
                    background-color: var(--sej-drop-list-background-qxin);
                    border: 1px solid var(--sej-drop-list-border-qxin);
                    overflow: hidden;
                    backdrop-filter: var(--sej-drop-list-backdrop-qxin);
                    -webkit-backdrop-filter: var(--sej-drop-list-backdrop-qxin);
                    border-bottom-right-radius: 3px;
                    border-bottom-left-radius: 3px;
                    transition: opacity 0.2s ease-in-out,
                        top 0.2s ease-in-out;
                }
                @keyframes sejopen {
                    0% {
                        transform: scale(1, 0.1);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(1, 1);
                        opacity: 1;
                    }
                }
                @keyframes iqxinsejopen {
                    0% {
                        transform: scale(0.01, 0.01);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(1, 1);
                        opacity: 1;
                    }
                }
            `;
        if (!getSettingData.transtion) {
          styleText += `
                    .sej-engine,
                    .sej-drop-list-trigger,
                    .sej-drop-list{
                        transition:none!important;
                    }
                    #sej-container{
                        animation:none!important;
                    }
                    .sej-drop-list {
                        backdrop-filter:none!important;
                        }
                 `;
        }
        GM_addStyle(styleText);
        syncSEJPageTheme();
        if (!window.__sejThemeSyncStarted) {
          window.__sejThemeSyncStarted = true;
          var syncThemeObserver = window.MutationObserver || window.WebKitMutationObserver;
          if (syncThemeObserver) {
            var sejThemeObserver = new syncThemeObserver(syncSEJPageTheme);
            var observeThemeAttrs = {
              attributes: true,
              attributeFilter: ["class", "style", "data-theme", "qxintheme"]
            };
            sejThemeObserver.observe(document.documentElement, observeThemeAttrs);
            if (document.body) {
              sejThemeObserver.observe(document.body, observeThemeAttrs);
            }
            if (document.head) {
              sejThemeObserver.observe(document.head, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ["content", "name"]
              });
            }
            window.__sejThemeObserver = sejThemeObserver;
          }
          var sejThemeMedia = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
          if (sejThemeMedia) {
            if (sejThemeMedia.addEventListener) {
              sejThemeMedia.addEventListener("change", syncSEJPageTheme);
            } else if (sejThemeMedia.addListener) {
              sejThemeMedia.addListener(syncSEJPageTheme);
            }
          }
          window.__sejThemeMedia = sejThemeMedia;
        }
        function sejThemeFromValue(value) {
          if (!value) {
            return null;
          }
          var text = String(value).toLowerCase().trim();
          if (!text || text === "auto" || text === "system") {
            return null;
          }
          if (/(^|[\s_-])(dark|night|black)([\s_-]|$)/.test(text)) {
            return "dark";
          }
          if (/(^|[\s_-])(light|day|white)([\s_-]|$)/.test(text)) {
            return "light";
          }
          return null;
        }
        function sejThemeFromClass(value) {
          if (!value) {
            return null;
          }
          var text = " " + String(value).toLowerCase() + " ";
          if (/(\s|^)(dark|theme-dark|dark-mode|night|night-mode)(\s|$)/.test(text)) {
            return "dark";
          }
          if (/(\s|^)(light|theme-light|light-mode|day|day-mode)(\s|$)/.test(text)) {
            return "light";
          }
          return null;
        }
        function sejThemeFromColorScheme(value) {
          if (!value) {
            return null;
          }
          var text = String(value).toLowerCase();
          var hasDark = /(^|\s)dark(\s|$)/.test(text);
          var hasLight = /(^|\s)light(\s|$)/.test(text);
          if (hasDark && !hasLight) {
            return "dark";
          }
          if (hasLight && !hasDark) {
            return "light";
          }
          return null;
        }
        function getSEJPageTheme() {
          var html = document.documentElement;
          var body = document.body;
          var meta = document.querySelector("meta[name='color-scheme']");
          return sejThemeFromValue(body && body.getAttribute("data-theme")) || sejThemeFromValue(html && html.getAttribute("data-theme")) || sejThemeFromClass(body && body.className) || sejThemeFromClass(html && html.className) || sejThemeFromColorScheme(meta && meta.getAttribute("content")) || sejThemeFromColorScheme(html && html.style && html.style.colorScheme) || sejThemeFromColorScheme(body && body.style && body.style.colorScheme);
        }
        function syncSEJPageTheme() {
          if (!document.body) {
            return;
          }
          var theme = getSEJPageTheme();
          if (!theme) {
            theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
          }
          if (document.body.getAttribute("qxintheme") !== theme) {
            document.body.setAttribute("qxintheme", theme);
          }
        }
        function DropDownList(a, list) {
          this.a = a;
          this.list = list;
          this.init();
        }
        ;
        DropDownList.zIndex = 1e8;
        DropDownList.prototype = {
          hidden: true,
          showDelay: 233,
          hideDelay: 233,
          aShownClass: "sej-drop-list-trigger-shown",
          init: function() {
            var a = this.a;
            var list = this.list;
            var self = this;
            if (!getSettingData.transtion) {
              this.showDelay = 0;
              this.hideDelay = 0;
            }
            mouseEventListener.add("mouseenter", a, function() {
              clearTimeout(self.hideTimerId);
              if (self.hidden) {
                self.showTimerId = setTimeout(function() {
                  self.show();
                }, self.showDelay);
              } else {
                var style = list.style;
                style.top = parseInt(list.style.top) - 6 + "px";
                style.zIndex = DropDownList.zIndex++;
                style.opacity = 1;
              }
              ;
            });
            mouseEventListener.add("mouseleave", a, function() {
              clearTimeout(self.showTimerId);
              if (!self.hidden) {
                list.style.top = parseInt(list.style.top) + 6 + "px";
                list.style.opacity = 0.04;
                self.hideTimerId = setTimeout(function() {
                  self.hide();
                }, self.hideDelay);
              }
              ;
            });
            mouseEventListener.add("mouseenter", list, function() {
              clearTimeout(self.hideTimerId);
              var style = list.style;
              style.zIndex = DropDownList.zIndex++;
              style.opacity = 1;
              style.top = parseInt(list.style.top) - 6 + "px";
            });
            mouseEventListener.add("mouseleave", list, function() {
              list.style.opacity = 0.04;
              list.style.top = parseInt(list.style.top) + 6 + "px";
              self.hideTimerId = setTimeout(function() {
                self.hide();
              }, self.hideDelay);
            });
          },
          show: function() {
            if (!this.hidden) return;
            this.hidden = false;
            var scrolled = getScrolled();
            var aBCRect = this.a.getBoundingClientRect();
            var thisBCRect = this.a.parentNode.getBoundingClientRect();
            var style = this.list.style;
            var top = scrolled.y + aBCRect.bottom;
            var left = scrolled.x + aBCRect.left;
            style.top = top + 6 + "px";
            style.left = left + "px";
            style.zIndex = DropDownList.zIndex--;
            style.display = "block";
            style.left = left - (this.list.getBoundingClientRect().width - aBCRect.width) / 2 + "px";
            setTimeout(function() {
              style.opacity = 1;
              style.top = top + "px";
            }, 30);
            this.a.classList.add(this.aShownClass);
          },
          hide: function() {
            if (this.hidden) return;
            this.hidden = true;
            var style = this.list.style;
            style.display = "none";
            style.opacity = 0.1;
            this.a.classList.remove(this.aShownClass);
          }
        };
        var container = document.createElement("sejspan");
        container.id = "sej-container";
        container.className = "rwl-exempt";
        if (!matchedRule) {
          container.classList.add("selectSearch");
        }
        if (matchedRule?.class) {
          container.className = container.className + " " + matchedRule.class;
        }
        container.addEventListener("mousedown", mousedownhandler, true);
        var aPattern = '<a href="" class="sej-engine" target="$blank$" data-iqxincategory="$category$" encoding="$encoding$" gbk="$gbk$" url="$url$"><img src="$favicon$" class="sej-engine-icon" $iconSourceAttr$/>$name$</a>';
        var dropLists = [];
        engineList.details.forEach(function(item) {
          var category = item[1];
          var cName = item[0];
          var engines = [];
          engineList[category].forEach(function(engine) {
            if (engine.disable) return;
            var engineUrl = engine.url;
            if (getSettingData.HideTheSameLink && matchedRule?.url.test(engineUrl)) return;
            var iconData = getIconRenderData(engine.favicon);
            var a2 = aPattern.replace("$encoding$", (engine.encoding || "utf-8").toLowerCase()).replace("$url$", engineUrl).replace("$name$", engine.name).replace("$category$", category).replace("$favicon$", escapeAttr(iconData.src)).replace("$iconSourceAttr$", getIconSourceAttr(iconData));
            if (engine.gbk) {
              a2 = a2.replace("$gbk$", engine.gbk);
            } else {
              a2 = a2.replace('gbk="$gbk$"', "");
            }
            ;
            if (getSettingData.newtab || engine.blank) {
              a2 = a2.replace("$blank$", "_blank");
            } else {
              a2 = a2.replace('target="$blank$"', "");
            }
            ;
            engines.push(a2);
          });
          if (!engines.length) return;
          engines = engines.join("");
          if (!getSettingData.foldlist && category == matchedRule?.engineList) {
            container.innerHTML = engines;
          } else {
            var dropList = document.createElement("sejspan");
            dropList.className = "sej-drop-list rwl-exempt";
            dropList.innerHTML = engines;
            var a = dropList.firstElementChild.cloneNode(true);
            a.className = a.className + " sej-drop-list-trigger";
            if (!getSettingData.icon) {
              cName = "";
            }
            a.lastChild.nodeValue = cName;
            dropLists.push([a, dropList]);
          }
          ;
        });
        dropLists.forEach(function(item) {
          if (getSettingData.icon == 2) {
            if (icon[item[0].dataset.iqxincategory]) {
              item[0].querySelector("img").src = icon[item[0].dataset.iqxincategory];
              item[0].querySelector("img").removeAttribute("data-iqxin-icon-src");
            }
          }
          container.appendChild(item[0]);
          document.body.appendChild(item[1]);
          item[1].addEventListener("mousedown", mousedownhandler, true);
          new DropDownList(item[0], item[1]);
        });
        switch (iTargetWhere) {
          case "beforebegin":
            iTarget.parentNode.insertBefore(container, iTarget);
            break;
          case "afterbegin":
            if (iTarget.firstChild) {
              iTarget.insertBefore(container, iTarget.firstChild);
            } else {
              iTarget.appendChild(container);
            }
            ;
            break;
          case "beforeend":
            iTarget.appendChild(container);
            break;
          case "afterend":
            if (iTarget.nextSibling) {
              iTarget.parentNode.insertBefore(container, iTarget.nextSibling);
            } else {
              iTarget.parentNode.appendChild(container);
            }
            ;
            break;
          default:
            iTarget.appendChild(container);
            break;
        }
        ;
        if (matchedRule?.style) {
          if (getSettingData.center == 2) {
            if (document.querySelector(".AC-style-logo") && matchedRule.style_ACBaidu) {
              console.log("检测到脚本：“AC-baidu:重定向优化百度搜狗谷歌搜索_去广告_favicon_双列”   ------自动添加");
              matchedRule.style = matchedRule.style_ACBaidu;
            }
          } else if (getSettingData.center == 1) {
            console.log("检测到脚本：“AC-baidu:重定向优化百度搜狗谷歌搜索_去广告_favicon_双列”   ------强制添加");
            matchedRule.style = matchedRule.style_ACBaidu ? matchedRule.style_ACBaidu : matchedRule.style;
          }
          if (document.getElementById("SearchMain")) {
            if (document.getElementById("SearchMain").style.marginLeft == "150px") {
              matchedRule.style = matchedRule.style_ZhihuChenglinz;
              matchedRule.fixedTop = null;
              console.log("检测到‘知乎排版优化’脚本");
            }
          }
          container.style.cssText = matchedRule.style;
        }
        ;
        setTimeout(function() {
          if (document.querySelector(".AC-baiduLiteStyle") && matchedRule.fixedTop2) {
            console.log("检测到 AC-baiduLiteStyle");
            matchedRule.fixedTop = matchedRule.fixedTop2;
          } else {
            console.log("没找到 AC-baiduLiteStyle");
          }
        }, 2500);
        if (matchedRule?.stylish) {
          GM_addStyle(matchedRule.stylish);
        }
        ;
        if (getSettingData.fixedTop && matchedRule) {
          if (getSettingData.fixedTopUpward) {
            window.onmousewheel = document.onmousewheel = function(eee) {
              if (eee.wheelDelta > 0) {
                fixedTopFun(matchedRule.fixedTop, matchedRule.fixedTopColor);
              } else {
                var obj = document.getElementById("sej-container");
                obj.style.cssText = matchedRule.style;
              }
            };
          } else {
            window.onscroll = function() {
              fixedTopFun(matchedRule.fixedTop, matchedRule.fixedTopColor);
            };
          }
        } else {
          window.onscroll = function() {
            return true;
          };
        }
        ;
        function fixedTopFun(height, color) {
          var obj = document.getElementById("sej-container");
          if (!obj) {
            return;
          }
          ;
          var objTop = obj.offsetTop;
          var objLeft = obj.offsetLeft;
          var current = obj.offsetParent;
          while (current !== null) {
            objLeft += current.offsetLeft;
            current = current.offsetParent;
          }
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          if (height) {
            objTop = height;
          } else {
            height = 0;
          }
          if (scrollTop <= objTop) {
            obj.style.cssText = matchedRule.style;
          } else if (obj.style.position != "fixed") {
            var objstyle = window.getComputedStyle(obj, null);
            var marginTop = parseInt(objstyle.marginTop);
            var marginLeft = parseInt(objstyle.marginLeft);
            var marginRight = parseInt(objstyle.marginRight);
            obj.style.top = height - marginTop + "px";
            if (color) {
              obj.style.background = color;
            } else if (objstyle.backgroundColor === "rgba(0, 0, 0, 0)" || objstyle.backgroundColor === "transparent") {
              obj.style.background = "#fff";
            }
            obj.style.left = getElementLeft(obj) - marginLeft + "px";
            debug("objLeft: ", objLeft, "marginLeft: ", marginLeft, "marginRight: ", marginRight, "getElementLeft: ", getElementLeft(obj));
            if (marginRight === marginLeft && marginRight != 0) {
              obj.style.left = marginLeft + "px";
            }
            if (obj.style.textAlign === "center") {
              obj.style.width = objstyle.width;
            }
            obj.style.position = "fixed";
            obj.style.padding = "0px 5px 0px 0px";
          }
        }
        function fixedTopFun2(Target, where) {
          var obj = document.getElementById("sej-container");
          var oTarget = getElement(Target);
          console.log("fixedTopFun2");
          console.log(Target);
          console.log(where);
          switch (where.toLowerCase()) {
            case "beforebegin":
              oTarget.parentNode.insertBefore(obj, oTarget);
              break;
            case "afterbegin":
              if (oTarget.firstChild) {
                oTarget.insertBefore(obj, oTarget.firstChild);
              } else {
                oTarget.appendChild(obj);
              }
              ;
              break;
            case "beforeend":
              oTarget.appendChild(obj);
              break;
            case "afterend":
              if (oTarget.nextSibling) {
                oTarget.parentNode.insertBefore(obj, oTarget.nextSibling);
              } else {
                oTarget.parentNode.appendChild(obj);
              }
              ;
              break;
          }
          ;
        }
        ;
      }
      var dragEl = null;
      var dragData = null;
      function SEJsetting() {
        this.host = document.createElement("div");
        this.root = this.host.attachShadow({ mode: "open" });
        this.ele = document.createElement("div");
        this.mask = document.createElement("div");
        this.parentTemp = null;
        this.editTemp = null;
        this.online = null;
        this.hideTimer = null;
        this.scrollLockState = null;
        this.themeObserver = null;
        this.themeMedia = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
        this.boundSyncTheme = this.syncTheme.bind(this);
        this.boundModalWheel = this.modalWheel.bind(this);
        this.boundModalTouchStart = this.modalTouchStart.bind(this);
        this.boundModalTouchMove = this.modalTouchMove.bind(this);
        this.touchStartY = null;
        this.init();
      }
      ;
      SEJsetting.prototype = {
        testabc: "hahah",
        aPatternParent: "<div></div>",
        $: function(selector) {
          return this.root.querySelector(selector);
        },
        $$: function(selector) {
          return this.root.querySelectorAll(selector);
        },
        bindThemeObservers: function() {
          if (this.themeObserver) {
            return;
          }
          var Observer = window.MutationObserver || window.WebKitMutationObserver;
          if (Observer) {
            this.themeObserver = new Observer(this.boundSyncTheme);
            var observeThemeAttrs = {
              attributes: true,
              attributeFilter: ["class", "style", "data-theme", "qxintheme"]
            };
            this.themeObserver.observe(document.documentElement, observeThemeAttrs);
            if (document.body) {
              this.themeObserver.observe(document.body, observeThemeAttrs);
            }
            if (document.head) {
              this.themeObserver.observe(document.head, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ["content", "name"]
              });
            }
          }
          if (this.themeMedia) {
            if (this.themeMedia.addEventListener) {
              this.themeMedia.addEventListener("change", this.boundSyncTheme);
            } else if (this.themeMedia.addListener) {
              this.themeMedia.addListener(this.boundSyncTheme);
            }
          }
        },
        unbindThemeObservers: function() {
          if (this.themeObserver) {
            this.themeObserver.disconnect();
            this.themeObserver = null;
          }
          if (this.themeMedia) {
            if (this.themeMedia.removeEventListener) {
              this.themeMedia.removeEventListener("change", this.boundSyncTheme);
            } else if (this.themeMedia.removeListener) {
              this.themeMedia.removeListener(this.boundSyncTheme);
            }
          }
        },
        themeFromValue: function(value) {
          if (!value) {
            return null;
          }
          var text = String(value).toLowerCase().trim();
          if (!text || text === "auto" || text === "system") {
            return null;
          }
          if (/(^|[\s_-])(dark|night|black)([\s_-]|$)/.test(text)) {
            return "dark";
          }
          if (/(^|[\s_-])(light|day|white)([\s_-]|$)/.test(text)) {
            return "light";
          }
          return null;
        },
        themeFromClass: function(value) {
          if (!value) {
            return null;
          }
          var text = " " + String(value).toLowerCase() + " ";
          if (/(\s|^)(dark|theme-dark|dark-mode|night|night-mode)(\s|$)/.test(text)) {
            return "dark";
          }
          if (/(\s|^)(light|theme-light|light-mode|day|day-mode)(\s|$)/.test(text)) {
            return "light";
          }
          return null;
        },
        themeFromColorScheme: function(value) {
          if (!value) {
            return null;
          }
          var text = String(value).toLowerCase();
          var hasDark = /(^|\s)dark(\s|$)/.test(text);
          var hasLight = /(^|\s)light(\s|$)/.test(text);
          if (hasDark && !hasLight) {
            return "dark";
          }
          if (hasLight && !hasDark) {
            return "light";
          }
          return null;
        },
        getPageTheme: function() {
          var html = document.documentElement;
          var body = document.body;
          var meta = document.querySelector("meta[name='color-scheme']");
          return this.themeFromValue(body && body.getAttribute("qxintheme")) || this.themeFromValue(body && body.getAttribute("data-theme")) || this.themeFromValue(html && html.getAttribute("data-theme")) || this.themeFromClass(body && body.className) || this.themeFromClass(html && html.className) || this.themeFromColorScheme(meta && meta.getAttribute("content")) || this.themeFromColorScheme(html && html.style && html.style.colorScheme) || this.themeFromColorScheme(body && body.style && body.style.colorScheme);
        },
        getPreferredTheme: function() {
          var pageTheme = this.getPageTheme();
          if (pageTheme) {
            return pageTheme;
          }
          return this.themeMedia && this.themeMedia.matches ? "dark" : "light";
        },
        syncTheme: function() {
          var theme = this.getPreferredTheme();
          this.host.setAttribute("data-theme", theme);
          this.host.style.colorScheme = theme;
        },
        lockPageScroll: function() {
          if (this.scrollLockState) {
            return;
          }
          var html = document.documentElement;
          var body = document.body;
          this.scrollLockState = {
            htmlOverflow: html.style.overflow,
            htmlOverscrollBehavior: html.style.overscrollBehavior,
            bodyOverflow: body.style.overflow,
            bodyOverscrollBehavior: body.style.overscrollBehavior
          };
          html.style.overflow = "hidden";
          body.style.overflow = "hidden";
          html.style.overscrollBehavior = "none";
          body.style.overscrollBehavior = "none";
        },
        unlockPageScroll: function() {
          if (!this.scrollLockState) {
            return;
          }
          var html = document.documentElement;
          var body = document.body;
          html.style.overflow = this.scrollLockState.htmlOverflow;
          html.style.overscrollBehavior = this.scrollLockState.htmlOverscrollBehavior;
          body.style.overflow = this.scrollLockState.bodyOverflow;
          body.style.overscrollBehavior = this.scrollLockState.bodyOverscrollBehavior;
          this.scrollLockState = null;
        },
        getScrollTarget: function(e) {
          var path = e.composedPath ? e.composedPath() : [];
          for (var i = 0; i < path.length; i++) {
            var node = path[i];
            if (node === this.mask) {
              break;
            }
            if (node && node.nodeType === 1 && node.scrollHeight > node.clientHeight) {
              var overflowY = window.getComputedStyle(node).overflowY;
              if (overflowY !== "hidden" && overflowY !== "visible") {
                return node;
              }
            }
          }
          return this.mask;
        },
        stopScrollAtBoundary: function(e, deltaY) {
          var scroller = this.getScrollTarget(e);
          var maxScroll = scroller.scrollHeight - scroller.clientHeight;
          var canScroll = maxScroll > 0;
          var atTop = scroller.scrollTop <= 0;
          var atBottom = scroller.scrollTop >= maxScroll - 1;
          e.stopPropagation();
          if (!canScroll || deltaY < 0 && atTop || deltaY > 0 && atBottom) {
            e.preventDefault();
          }
        },
        modalWheel: function(e) {
          this.stopScrollAtBoundary(e, e.deltaY);
        },
        modalTouchStart: function(e) {
          if (e.touches && e.touches.length) {
            this.touchStartY = e.touches[0].clientY;
          }
        },
        modalTouchMove: function(e) {
          if (!e.touches || !e.touches.length || this.touchStartY === null) {
            e.stopPropagation();
            e.preventDefault();
            return;
          }
          var nextY = e.touches[0].clientY;
          var deltaY = this.touchStartY - nextY;
          this.touchStartY = nextY;
          this.stopScrollAtBoundary(e, deltaY);
        },
        destroy: function() {
          if (this.hideTimer) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
          }
          this.unlockPageScroll();
          this.unbindThemeObservers();
        },
        init: function() {
          var that = this;
          this.host.id = "sej-setting-host";
          this.host.style.cssText = "display:block!important;position:static!important;";
          this.ele.id = "settingLayer";
          this.mask.id = "settingLayerMask";
          this.addGlobalStyle();
          this.syncTheme();
          this.bindThemeObservers();
          this.addContent();
          this.mask.addEventListener("click", function() {
            that.hide();
          });
          this.mask.addEventListener("wheel", this.boundModalWheel, { capture: true, passive: false });
          this.mask.addEventListener("touchstart", this.boundModalTouchStart, { capture: true, passive: true });
          this.mask.addEventListener("touchmove", this.boundModalTouchMove, { capture: true, passive: false });
          this.ele.addEventListener("click", function(e) {
            e.stopPropagation();
          });
          this.mask.appendChild(this.ele);
          this.root.appendChild(this.mask);
          document.body.appendChild(this.host);
          this.ele.addEventListener("click", that.domClick.bind(this), false);
          this.dragEvent();
          this.setDragNode(this.ele);
          that.rangeChange(true);
          this.$("#setBtnOpacityRange").addEventListener("input", that.rangeChange.bind(that));
        },
        dragEvent: function() {
          var that = this;
          var odivsdrag = this.$$(".drag");
          [].forEach.call(odivsdrag, function(odiv) {
            if (odiv.dataset.sejDragBound) {
              return;
            }
            odiv.dataset.sejDragBound = "true";
            odiv.addEventListener("dragstart", that.domdragstart, false);
            odiv.addEventListener("dragenter", that.domdragenter, false);
            odiv.addEventListener("dragover", that.domdragover, false);
            odiv.addEventListener("dragleave", that.domdragleave, false);
            odiv.addEventListener("drop", that.domdrop.bind(that), false);
            odiv.addEventListener("dragend", that.domdropend.bind(that), false);
          });
        },
        addContent: function() {
          var aPattern = '<span draggable="true" class="drag"><span class="sej-engine" data-xin="$xin$"  data-iqxinimg="$img$"  data-iqxintitle="$title$"  data-iqxinlink="$link$"  data-iqxintarget="$blank$"  data-iqxindisabled="$disabled$"  data-iqxingbk="$gbk$" ><img src="$favicon$" class="sej-engine-icon" style="padding-bottom:3px;" $iconSourceAttr$/><span>$name$</span></span> <span class="iqxin-set-edit" title="编辑 Edit"><img class="sej-engine-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAACDklEQVR4nJXVzUtUURjH8Y/mSNKkki2iwiApxHQ1q/6C+gusoCB6oxbRRqFNL4sWtRKqhVSLIDe1CqpNiwjKIilKLKKFEr2Z2qI0xxHN0+LOm+PMOPOc1T2H7/f5ncO991BdNer30zmxKrl0xV2zKJjRoy6aqkkvbbdVLPuUq+8+5uGXnVILki7qsxgtNDtrTNLcijHvrdYsft0/wQ8DZgSzeqMUDW4IJceYHcvwCd1ies0KZvWI1TnhIH6574Olgg0E74zmhZ902j304by4Cxp5LPjtQNmjy3XPVK2rgmCBCcGgdVXhdBgUBCMEwVMNVeIvBMFLifKC8vgrndFBlRJUhJcWFMd3ZfGuzFRxwWrdu3KTxQQVhi8lqApfKVhf0d4bc2/OckG9Pkur7r3TEw+1FRO0GxdM2Vc2/HHBgr1If935UTfigbt5+C27MeSo9+m5GJYitlCwWR2G8oQZ/FgWX1aFgnZMG852v5nFR4rhMn+2dDVJYFpKqy0SDksUhF9FsE0bWgyIa9bIanihoEUcDTrSz4ueOVMOLxQkzVkrZcaoNz755rmpcnihYNghm3w26Ys/5cGcIKgRBJDyqCIquj8C1PqKZvHK+qVrJ5bMRwmGterU64pkkZupWO3RjXkzUZj9+jVZMGK6IsEaHTbgjpOSUYZL/pa5m4qPIbtyznpHvJaqGB53O33h4T/3VzLuzDhE6AAAAABJRU5ErkJggg=="/></span> <span class="iqxin-set-del" title="删除 Delete"><img class="sej-engine-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAADAFBMVEUAAADsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVH///9VVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fX19gYGBhYWFiYmJjY2NkZGRlZWVmZmZnZ2doaGhpaWlqampra2tsbGxtbW1ubm5vb29wcHBxcXFycnJzc3N0dHR1dXV2dnZ3d3d4eHh5eXl6enp7e3t8fHx9fX1+fn5/f3+AgICBgYGCgoKDg4OEhISFhYWGhoaHh4eIiIiJiYmKioqLi4uMjIyNjY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSVlZWWlpaXl5eYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7///8dej9TAAAAU3RSTlMAAABm7P/sZgAAABPO////zhQAAB/i/////////+IfAAAe4fvk4AAAAAAd/+Q3GxwAFR85FQBjz+LPY+v////r6//////rZM/h4c9jABUdHRUAAP0EcPoAAAEuSURBVHic7ZRnc8IwDIbdEUZHGB0kDsMOMcOMttBBB93Qvcj//y9VjB0Czh13/dz3ixT5OVmSYyMktLK6tm74oYxEMpVGUW1sbm2bM8DMZHP5OWBnd2+/YNnYAWHbKhRL5cocQKjrWFWPuSDmVS3HpUQu1eoNQkiTM9xqd7oHoG6n3cKMNyHcqNfQ4VGPUsr7nh0FbK/PIdw7PkGnZwOZNrqF9AfnF+jyaigLixYp/eH1Dbq9u4eAHyOAHh5HaPz0DCnjANjm5fUNvX98QoGCxyo5Fjmh0K/vH2hzAi0KnqnymMgJrU6gzemQBM+DZpX1/XBYUyAYTTAuZTUg+Aw8Zf+BvwJLR730sPTjXgD0H2YB0BUClXKpGAeE1y+fy2ZMfX12gdOpZMLQAfkE/AL7e5vGZF+dOQAAAABJRU5ErkJggg=="></span></span>';
          var details2 = engineList.details;
          var detailsLength = 99;
          for (let i = 0; i < detailsLength; i++) {
            var j = i;
            j = details2[j] ? j : -j;
            if (!details2[j]) {
              break;
            }
            ;
            var odiv = document.createElement("div");
            odiv.id = details2[j][1];
            odiv.classList.add("iqxin-items");
            var oDivTitle = document.createElement("div");
            oDivTitle.classList.add("sejtitle", "drag");
            oDivTitle.setAttribute("draggable", "true");
            oDivTitle.dataset.iqxintitle = details2[j][1];
            oDivTitle.dataset.xin = j;
            oDivTitle.innerHTML = '<span class="iqxin-pointer-events">' + details2[j][0] + '</span><span class="iqxin-title-edit" title="编辑 Edit"><img class="sej-engine-icon" src="' + icon.edit + '"/></span> <span class="iqxin-set-title-del" title="删除 Delete"><img class="sej-engine-icon" src="' + icon.del + '"></span>';
            odiv.appendChild(oDivTitle);
            var oDivCon = document.createElement("div");
            oDivCon.classList.add("sejcon");
            var oDivConStr = "";
            var engineListItme = engineList[details2[j][1]];
            var itemLength = engineListItme.length;
            for (let ii = 0; ii < itemLength; ii++) {
              var jj = ii;
              if (!engineListItme[jj]) {
                break;
              }
              ;
              var iconData = getIconRenderData(engineListItme[jj].favicon);
              var a = aPattern.replace("$name$", engineListItme[jj].name).replace("$favicon$", escapeAttr(iconData.src)).replace("$iconSourceAttr$", getIconSourceAttr(iconData)).replace("$xin$", jj);
              a = a.replace("$img$", escapeAttr(iconData.saveSrc)).replace("$title$", engineListItme[jj].name).replace("$link$", engineListItme[jj].url);
              if (engineListItme[jj].blank) {
                a = a.replace("$blank$", "_blank");
              } else {
                a = a.replace('data-iqxintarget="$blank$"', "");
              }
              ;
              if (engineListItme[jj].disable) {
                a = a.replace("$disabled$", "true");
              } else {
                a = a.replace('data-iqxindisabled="$disabled$"', "");
              }
              ;
              if (engineListItme[jj].gbk) {
                a = a.replace("$gbk$", "true");
              } else {
                a = a.replace('data-iqxingbk="$gbk$"', "");
              }
              ;
              oDivConStr += a;
            }
            ;
            oDivConStr += "<span class='iqxin-additem'>+</span>";
            oDivCon.innerHTML = oDivConStr;
            odiv.appendChild(oDivCon);
            this.ele.appendChild(odiv);
          }
          ;
          var btnEle2 = document.createElement("div");
          btnEle2.id = "btnEle2";
          var fixedTop_checked = getSettingData.fixedTop ? "checked" : "";
          var fixedTopUpward_checked = getSettingData.fixedTopUpward ? "checked" : "";
          var transition_checked = getSettingData.transtion ? "checked" : "";
          var selectSearch_checked = getSettingData.selectSearch ? "checked" : "";
          var foldlist_checked = getSettingData.foldlist ? "checked" : "";
          var allOpen_checked = getSettingData.allOpen ? "checked" : "";
          var HideTheSameLink_checked = getSettingData.HideTheSameLink ? "checked" : "";
          var btnStr2 = "<div><span id='xin-modification' title='edit 分享自己的配置或清空配置'>配置文件</span><span id='xin-selectSearch' title='划词搜索, 只有非搜索页面才会生效, 开关功能需要刷新页面'><label>划词搜索<input id='iqxin-selectSearch' type='checkbox' name='' " + selectSearch_checked + " style='vertical-align:middle;'></label></span><span id='xin-transtion' title='动画,该设置需要刷新页面生效'><label>动画<input id='iqxin-transtion' type='checkbox' name='' " + transition_checked + " style='vertical-align:middle;'></label></span><span id='xin-foldlists' title='将当前所在搜索分类折叠'><label>折叠当前搜索分类<input id='iqxin-foldlist' type='checkbox' name='' " + foldlist_checked + " style='vertical-align:middle;'></label></span><span id='iqxin-fixedTopS' title='fixedTop 当滚动页面时,固定到页面顶端。某些页面的样式存在问题'><label>固定到顶端<input id='iqxin-fixedTop' type='checkbox' name='' " + fixedTop_checked + " style='vertical-align:middle;'></label></span><span id='iqxin-fixedTopUpward' title='固定到顶端后,仅向上滚动才显示,需要刷新网页生效'><label>仅上拉显示<input id='iqxin-fixedTopUpward-item' type='checkbox' name='' " + fixedTopUpward_checked + " style='vertical-align:middle;'></label></span><span id='xin-HideTheSameLink' title='隐藏同站链接,如果想在同一个搜索网站,但是想通过不同语言来搜索, 可以取消该选项'><label>隐藏同站链接<input id='iqxin-HideTheSameLink' type='checkbox' name='' " + HideTheSameLink_checked + " style='vertical-align:middle;'></label></span><span id='xin-setBtnOpacity' title='设置按钮透明度,需要刷新页面'>设置按钮透明度 <input type='range' step='0.05'  min='0' max='1' value='" + (getSettingData.setBtnOpacity < 0 ? -getSettingData.setBtnOpacity : getSettingData.setBtnOpacity) + "' id='setBtnOpacityRange'><i style='display:inline-block;width:3em;text-align:center;' class='iqxin-setBtnOpacityRangeValue' title='按钮 显示/隐藏(非透明)),请确定知道自己如何再次打开; 火狐非高级玩家建议别禁用'></i></span></div>";
          btnEle2.innerHTML = btnStr2;
          this.ele.appendChild(btnEle2);
          var btnEle = document.createElement("div");
          btnEle.id = "btnEle";
          var btnStr = "<div class='btnEleLayer'><span class='feedback' title='在 GreasyFork 进行反馈'><a target='_blank' href='https://greasyfork.org/zh-CN/scripts/27752-searchenginejump'>Greasy Fork</a></span><span class='feedback' title='在 Github 进行反馈'><a target='_blank' href='https://github.com/qxinGitHub/searchEngineJump'>GitHub</a></span><span id='xin-allOpen' title='后台打开该搜索分类的所有网站'><label>一键搜索<input id='iqxin-allOpen-item' type='checkbox' name='' " + allOpen_checked + " style='vertical-align:middle;'></label></span><span id='xin-centerDisplay' title='center 居中显示。主要是兼容AC-baidu:重定向优化百度搜狗谷歌搜索_去广告_favicon_双列'>居中：<select id='iqxin-center'><option value='original'" + (getSettingData.center == 0 ? "selected" : "") + ">默认 ▽</option><option value='force'" + (getSettingData.center == 1 ? "selected" : "") + ">强制 ▽</option><option value='auto'" + (getSettingData.center == 2 ? "selected" : "") + ">自动 ▽</option></select></span> <span id='xin-newtab' title='open newtab 是否采用新标签页打开的方式'>打开方式：<select id='iqxin-globalNewtab'><option value='globalDef'>默认页面 ▽</option><option value='globalNewtab'" + (getSettingData.newtab ? "selected" : "") + ">新标签页 ▽</option></select></span> <span id='xin-addDel' title='add & del 增加新的或者删除现有的搜索'>增加 / 删除</span> <span id='moreSet' title='more set'>更多设置</span><span id='xin-save' title='save & close'>保存并关闭</span></div>";
          btnEle.innerHTML = btnStr;
          this.ele.appendChild(btnEle);
          var dragDom = document.createElement("div");
          dragDom.id = "dragDom";
          dragDom.style.cssText = "height:16px;width:97%;position:absolute;top:0;cursor:move;";
          this.ele.appendChild(dragDom);
          var nSearchList = document.createElement("div");
          nSearchList.id = "nSearchList";
          nSearchList.style.cssText = "visibility:hidden;opacity:0;transition:0.3s;position:absolute;bottom:10%;right:5%;padding:5px 10px;border-radius:4px;border:1px solid #EC6D51;color:#ec6d51;cursor:pointer;background:#fff;";
          nSearchList.innerHTML = "增加新的搜索列表";
          this.ele.appendChild(nSearchList);
          if (getSettingData.closeBtn) {
            var closebtnELe = document.createElement("span");
            closebtnELe.id = "xin-close";
            closebtnELe.setAttribute("title", "close 关闭");
            this.ele.appendChild(closebtnELe);
          }
        },
        show: function() {
          if (this.hideTimer) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
          }
          this.syncTheme();
          this.lockPageScroll();
          var style = this.mask.style;
          var eleStyle = this.ele.style;
          style.display = "block";
          eleStyle.transform = "translateY(-20%)";
          this.windowResize();
          setTimeout(function() {
            style.opacity = 1;
            eleStyle.transform = "none";
          }, 30);
        },
        hide: function() {
          this.allBoxClose();
          var that = this;
          var style = this.mask.style;
          this.ele.style.transform = "translateY(20%)";
          style.opacity = 0;
          if (this.hideTimer) {
            clearTimeout(this.hideTimer);
          }
          this.hideTimer = setTimeout(function() {
            style.display = "none";
            that.unlockPageScroll();
            that.hideTimer = null;
          }, 500);
        },
        reset: function() {
          if (confirm("将会删除用户设置！")) {
            GM_deleteValue("searchEngineJumpData");
            window.location.reload();
          }
        },
        // 增加 “添加删除框”
        addDel: function(e) {
          if (e.target.classList.contains("iqxin-btn-active")) {
            this.addDelremove();
          } else {
            var obtn = this.$("#xin-addDel");
            obtn.classList.add("iqxin-btn-active");
            var odom = this.$$(".iqxin-set-del");
            [].forEach.call(odom, function(div) {
              div.classList.add("iqxin-set-active");
            });
            var odom = this.$$(".iqxin-set-title-del");
            [].forEach.call(odom, function(div) {
              div.classList.add("iqxin-set-active");
            });
            var oitemAdd = this.$$(".iqxin-additem");
            [].forEach.call(oitemAdd, function(div) {
              div.classList.add("iqxin-set-active");
            });
            var olistAdd = this.$("#nSearchList");
            olistAdd.classList.add("iqxin-set-active");
          }
        },
        // 关闭 “添加删除框”
        addDelremove: function(bool) {
          var obtn = this.$("#xin-addDel.iqxin-btn-active");
          if (obtn) {
            obtn.classList.remove("iqxin-btn-active");
            var odom = this.$$(".iqxin-set-active");
            [].forEach.call(odom, function(div) {
              div.classList.remove("iqxin-set-active");
            });
            var oitemAdd = this.$$(".iqxin-additem");
            [].forEach.call(oitemAdd, function(div) {
              div.classList.remove("iqxin-set-active");
            });
          }
          this.addItemBoxRemove();
        },
        // 界面,框：添加新的搜索
        addItemBox: function(bool) {
          this.isOnline();
          this.addItemBoxRemove();
          var newDiv = document.createElement("div");
          newDiv.id = "newSearchBox";
          newDiv.style.cssText = "top:43%;opacity:0.1;";
          newDiv.innerHTML = `<span>标&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp题 : </span><input id='iqxin-newTitle' placeholder='必填' onfocus='this.select()' /> <br/><br/><span>链&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp接 : </span><input id='iqxin-newLink' placeholder='必填' onfocus='this.select()' /> <br/><br/><span>图&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp标 : </span><input id='iqxin-newIcon' placeholder='选填,留空则自动获取' onfocus='this.select()' /> <br/><br/><span>打开方式 : <select id="iqxin-newTarget" style="border-radius: 4px;border: none;padding: 2px 0 2px 2px"> <option value="default">新标签页打开</option> <option value="newtab">当前页打开</option> <select> </span><br/><br/><span style=''><a target='_blank' style='color:#999;' href='https://greasyfork.org/zh-CN/scripts/27752-searchenginejump'>相关使用说明</a></span>&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp;<button id='addItemBoxEnter' class='addItemBoxEnter addItemBoxBtn iqxin-enterBtn'>确定</button>&nbsp;&nbsp;&nbsp&nbsp&nbsp;&nbsp<button id='addItemBoxCancel' class='addItemBoxCancel addItemBoxBtn iqxin-closeBtn'>取消</button>`;
          this.ele.appendChild(newDiv);
          setTimeout(function() {
            newDiv.style.cssText = "";
          }, 10);
          this.$("#iqxin-newTitle").focus();
        },
        // 内部逻辑,：添加新的搜索
        addItemEnger: function() {
          var otitle, olink, oimg, oblank;
          otitle = this.$("#iqxin-newTitle").value;
          olink = this.$("#iqxin-newLink").value;
          oimg = this.$("#iqxin-newIcon").value;
          oblank = this.$("#iqxin-newTarget").selectedIndex;
          if (!oimg) {
            oimg = this.getICON(olink);
          }
          var iconData = getIconRenderData(oimg);
          var a = '<span class="sej-engine" data-iqxinimg="$img$"  data-iqxintitle="$title$"  data-iqxinlink="$link$"  data-iqxintarget="$blank$" ><img src="$favicon$" class="sej-engine-icon" $iconSourceAttr$/>$name$</span><span class="iqxin-set-edit" title="编辑 Edit"><img class="sej-engine-icon" src="' + icon.edit + '"></span> <span class="iqxin-set-del iqxin-set-active" title="删除 Delete"><img class="sej-engine-icon" src="' + icon.del + '"></span>';
          a = a.replace("$img$", escapeAttr(iconData.saveSrc)).replace("$title$", otitle).replace("$link$", olink);
          if (oblank) {
            a = a.replace('data-iqxintarget="$blank$"', "");
          } else {
            a = a.replace("$blank$", "_blank");
          }
          ;
          a = a.replace("$name$", otitle).replace("$favicon$", escapeAttr(iconData.src)).replace("$iconSourceAttr$", getIconSourceAttr(iconData));
          var ospan = document.createElement("span");
          ospan.className = "drag";
          ospan.innerHTML = a;
          this.parentNode.insertBefore(ospan, this.parentNode.lastChild);
          this.addItemBoxRemove();
        },
        addItemBoxRemove: function(ele) {
          ele = ele ? ele : "#newSearchBox";
          var newBox = this.$(ele);
          if (newBox) {
            newBox.style.top = "60%";
            newBox.style.opacity = "0";
            setTimeout(function() {
              newBox.parentNode.removeChild(newBox);
            }, 550);
          }
        },
        // 获取图标
        getICON: function(olink) {
          var ourl;
          var mark;
          var uri = parseUri(olink);
          var ohttp = uri.protocol ? uri.protocol : "http";
          var siteURL = ohttp + "://" + uri.host;
          if (isNaN(getSettingData.getIcon)) {
            ourl = getSettingData.getIcon;
          } else {
            mark = parseInt(getSettingData.getIcon);
            console.log(mark);
            switch (mark) {
              case 1:
                ourl = siteURL + "/favicon.ico";
                break;
              case 2:
                ourl = "https://www.google.com/s2/favicons?domain=" + siteURL;
                break;
              case 3:
                ourl = "http://statics.dnspod.cn/proxy_favicon/_/favicon?domain=" + uri.host;
                break;
            }
          }
          if (ourl) {
            ourl = ourl.replace("%s", siteURL);
            return ourl;
          }
          debug("能否连接至google：", this.online);
          if (this.online) {
            ourl = "https://www.google.com/s2/favicons?domain=" + uri.host;
            return ourl;
          } else {
            ourl = ohttp + "://" + uri.host + "/favicon.ico";
            return ourl;
          }
        },
        // 界面, 框: 添加新的搜索列表
        addSearchListBox: function() {
          var odiv = this.$("#newSearchListBox");
          if (odiv) {
            this.boxClose("#newSearchListBox");
            return;
          }
          var newDiv = document.createElement("div");
          newDiv.id = "newSearchListBox";
          var myDate = /* @__PURE__ */ new Date();
          var hash = "user" + myDate.getTime();
          newDiv.innerHTML = "<span>列表名称: </span><input id='iqxin-newSearchListName' onfocus='this.select()'><br><br><span>内部名称: </span><input id='iqxin-newSearchListInnerName' onfocus='this.select()' value='" + hash + "'><br><br><button id='addSearchListBoxEnter' class='addSearchListBoxEnter addItemBoxBtn'>确定</button>&nbsp;&nbsp;&nbsp&nbsp&nbsp;&nbsp<button id='addSearchListBoxCancel' class='addSearchListBoxCancel addItemBoxBtn'>取消</button>";
          this.ele.appendChild(newDiv);
          this.$("#iqxin-newSearchListName").focus();
        },
        addSearchListEnger: function() {
          var name = this.$("#iqxin-newSearchListName").value;
          var innerName = this.$("#iqxin-newSearchListInnerName").value;
          if (innerName.length === 0) {
            alert("内部名称不能为空");
            return;
          }
          if (name.length === 0) {
            name = innerName;
          }
          var odiv = document.createElement("div");
          odiv.id = innerName;
          odiv.className = "iqxin-items";
          odiv.innerHTML = '<div class="sejtitle" data-iqxintitle="' + innerName + '" data-xin="99"><span class="iqxin-pointer-events">' + name + '</span><span class="iqxin-title-edit" title="编辑 Edit"><img class="sej-engine-icon" src="' + icon.edit + '"></span> <span class="iqxin-set-title-del iqxin-set-active" title="删除 Delete"><img class="sej-engine-icon" src="' + icon.del + '"></span></div><div class="sejcon"><span class="iqxin-additem iqxin-set-active">+</span></div>';
          this.addItemBoxRemove("#newSearchListBox");
          var btnEle = this.$("#btnEle");
          btnEle.parentNode.insertBefore(odiv, btnEle);
        },
        boxClose: function(ele) {
          var odiv = this.$(ele);
          if (odiv) {
            odiv.parentNode.removeChild(odiv);
          }
        },
        // 界面 框：修改框
        addEditBox: function(e) {
          console.log(e);
          this.addItemBoxRemove();
          var target = e.target.parentNode.firstChild;
          var otitle = target.dataset.iqxintitle;
          var olink = target.dataset.iqxinlink;
          var oicon = target.dataset.iqxinimg;
          var otarget = target.dataset.iqxintarget;
          var odisabled = target.dataset.iqxindisabled;
          let oGBK = target.dataset.iqxingbk;
          this.editTemp = target;
          console.log(oicon);
          var strblank;
          if (otarget) {
            strblank = '<option value="default">新标签页打开</option><option value="newtab">当前页打开</option> ';
          } else {
            strblank = '<option value="default">新标签页打开</option><option value="newtab" selected="selected">当前页打开</option>';
          }
          var strGBK = "";
          if (oGBK) {
            strGBK = "checked='checked'";
          }
          var newDiv = document.createElement("div");
          newDiv.id = "newSearchBox";
          newDiv.style.cssText = "top:43%;opacity:0.1;";
          var innerHTML = `
                    <span>标&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp题 : </span><input id="iqxin-newTitle" placeholder="必填" onfocus="this.select()" value="${otitle}" /> <br/><br/>
                    <span>链&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp接 : </span><input id="iqxin-newLink" placeholder="必填" onfocus="this.select()" value="${olink}" /> <br/><br/>
                    <span>图&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp标 : </span><input id="iqxin-newIcon" placeholder="选填,留空则自动获取" onfocus="this.select()" value="${oicon}" /> <br/><br/>
                    <span>打开方式 :
                        <select id="iqxin-newTarget" style="border-radius: 4px;border: none;padding: 2px 0 2px 2px">
                            ${strblank}
                        <select>
                    </span>
                    <br/><br/>
                    <span style=""><label>GBK编码：<input type="checkbox" name="" id="iqxin-newGBK" ${strGBK} style="vertical-align:middle;"></label></span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button id="editItemBoxEnter" class="editItemBoxEnter addItemBoxBtn iqxin-enterBtn">确定</button>&nbsp;&nbsp;&nbsp&nbsp&nbsp;&nbsp
                    <button id="addItemBoxCancel" class="addItemBoxCancel addItemBoxBtn iqxin-closeBtn">取消</button>
                    `;
          newDiv.innerHTML = innerHTML;
          this.ele.appendChild(newDiv);
          setTimeout(function() {
            newDiv.style.cssText = "";
          }, 10);
          this.$("#iqxin-newTitle").select();
        },
        addEditBoxEnger: function() {
          var otitle, olink, oimg, oblank, ogbk;
          otitle = this.$("#iqxin-newTitle").value;
          olink = this.$("#iqxin-newLink").value;
          oimg = this.$("#iqxin-newIcon").value;
          oblank = this.$("#iqxin-newTarget").selectedIndex;
          ogbk = this.$("#iqxin-newGBK").checked;
          if (!oimg) {
            oimg = this.getICON(olink);
          }
          var iconData = getIconRenderData(oimg);
          this.editTemp.dataset.iqxintitle = otitle;
          this.editTemp.lastChild.innerText = otitle;
          this.editTemp.dataset.iqxinlink = olink;
          this.editTemp.dataset.iqxinimg = iconData.saveSrc;
          this.editTemp.firstChild.src = iconData.src;
          if (isRemoteIcon(iconData.rawSrc)) {
            this.editTemp.firstChild.dataset.iqxinIconSrc = iconData.rawSrc;
          } else {
            this.editTemp.firstChild.removeAttribute("data-iqxin-icon-src");
          }
          if (oblank) {
            this.editTemp.removeAttribute("data-iqxintarget");
          } else {
            this.editTemp.dataset.iqxintarget = "_blank";
          }
          if (ogbk) {
            this.editTemp.dataset.iqxingbk = "true";
          } else {
            this.editTemp.removeAttribute("data-iqxingbk");
          }
          this.addItemBoxRemove();
        },
        // 标题编辑
        addTitleEditBox: function(e) {
          this.addItemBoxRemove();
          var element = e.target.parentNode.firstChild;
          element.classList.remove("iqxin-pointer-events");
          var flag = this.$("#titleEdit");
          if (flag && flag.parentNode == element) {
            element.innerHTML = element.firstChild.value ? element.firstChild.value : "空";
            element.classList.add("iqxin-pointer-events");
          } else {
            if (flag) {
              flag.parentNode.innerHTML = flag.parentNode.firstChild.value;
            }
            var oldhtml = element.innerHTML;
            var newobj = document.createElement("input");
            newobj.id = "titleEdit";
            newobj.type = "text";
            newobj.value = oldhtml;
            newobj.onkeydown = function(e2) {
              if ((e2.keyCode || e2.which) == 13) {
                element.innerHTML = this.value ? this.value : oldhtml;
              } else if ((e2.keyCode || e2.which) == 27) {
                element.innerHTML = oldhtml;
              }
              element.classList.add("iqxin-pointer-events");
            };
            element.innerHTML = "";
            element.appendChild(newobj);
            newobj.select();
          }
        },
        addTitleEditBoxRemove: function() {
          var odiv = this.$("#titleEdit");
          if (odiv) {
            odiv.parentNode.innerHTML = odiv.value ? odiv.value : "空";
          }
        },
        // 高级菜单,配置文件编辑界面
        editCodeBox: function() {
          console.log("原始数据： ", getSettingData);
          var userSetting = GM_getValue("searchEngineJumpData");
          var editbox = document.createElement("div");
          editbox.id = "iqxin-editCodeBox";
          editbox.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#ccc;border-radius:4px;padding:10px 20px;";
          var innerH = " <p><span style='color:red;font-size:1.2em;'>! ! !</span></br>此处有更多的设置选项,自由度更高,</br>但设置错误会导致脚本无法运行</p><textarea wrap='off' cols='45' rows='20' style='overflow:auto;border-radius:4px;'>" + JSON.stringify(userSetting, false, 4) + "</textarea><br><button id='xin-reset'>清空设置</button> &nbsp;&nbsp;&nbsp;<button id='xin-copyCode'>复制</button> &nbsp;&nbsp;&nbsp;<button id='codeboxclose' class='iqxin-closeBtn'>关闭</button> &nbsp;&nbsp;&nbsp;<button id='xin-codeboxsave' class='iqxin-enterBtn'>保存</button>";
          editbox.innerHTML = innerH;
          this.ele.appendChild(editbox);
        },
        editCodeBoxSave: function() {
          var codevalue = this.$("#iqxin-editCodeBox textarea").value;
          if (codevalue) {
            GM_setValue("searchEngineJumpData", JSON.parse(codevalue));
            setTimeout(function() {
              window.location.reload();
            }, 300);
          } else {
            this.reset();
          }
        },
        editCodeBoxClose: function() {
          var box = this.$("#iqxin-editCodeBox");
          if (box) {
            box.parentNode.removeChild(box);
          }
        },
        // 导入窗口
        addImportingBox: function() {
          var odiv = this.$("#importingBox");
          if (odiv) {
            this.boxClose("#importingBox");
            return;
          }
          var newDiv = document.createElement("div");
          newDiv.id = "importingBox";
          var a = "<p>更加细分的搜索列表, 列表之间会有所重合</p><ul>";
          for (let i = 0; i < engineList_plus.length; i++) {
            console.log(engineList_plus[i]);
            var includeWeb = "";
            for (let j = 0; j < engineList_plus[i].engineList.length; j++) {
              if (j != 0) {
                includeWeb += " | " + engineList_plus[i].engineList[j].name;
              } else {
                includeWeb += engineList_plus[i].engineList[j].name;
              }
            }
            a += "<li><span class='xin-importing-item' xin-importing-id='" + i + "' title='" + (engineList_plus[i].message ? engineList_plus[i].message : engineList_plus[i].engineDetails[0]) + "'>" + (engineList_plus[i].name ? engineList_plus[i].name : engineList_plus[i].engineDetails[0]) + " : </span><p title='" + includeWeb + "'>" + includeWeb + "</p>";
            "</li>";
          }
          a += "</ul>";
          newDiv.innerHTML = a;
          this.ele.appendChild(newDiv);
        },
        addImportingEnger: function(e) {
          var engineListID = e.target.getAttribute("xin-importing-id");
          var engineList_temp = engineList_plus[engineListID];
          var elist = engineList_temp.engineList;
          var name = engineList_temp.engineDetails[0];
          var innerName = engineList_temp.engineDetails[1];
          var odiv = document.createElement("div");
          odiv.id = innerName;
          odiv.className = "iqxin-items";
          var innerHTML = '<div class="sejtitle" data-iqxintitle="' + innerName + '" data-xin="99"><span class="iqxin-pointer-events">' + name + '</span><span class="iqxin-title-edit" title="编辑 Edit"><img class="sej-engine-icon" src="' + icon.edit + '"></span> <span class="iqxin-set-title-del iqxin-set-active" title="删除 Delete"><img class="sej-engine-icon" src="' + icon.del + '"></span></div><div class="sejcon">';
          for (let i = 0; i < elist.length; i++) {
            var iconData = getIconRenderData(elist[i].favicon);
            var a = '<span draggable="true" class="drag"><span class="sej-engine" data-iqxinimg="$img$"  data-iqxintitle="$title$"  data-iqxinlink="$link$"  data-iqxintarget="$blank$" ><img src="$favicon$" class="sej-engine-icon" $iconSourceAttr$/>$name$</span><span class="iqxin-set-edit" title="编辑 Edit"><img class="sej-engine-icon" src="' + icon.edit + '"></span> <span class="iqxin-set-del iqxin-set-active" title="删除 Delete"><img class="sej-engine-icon" src="' + icon.del + '"></span></span>';
            a = a.replace("$img$", escapeAttr(iconData.saveSrc)).replace("$title$", elist[i].name).replace("$link$", elist[i].url);
            if (elist[i].blank) {
              a = a.replace("$blank$", "_blank");
            } else {
              a = a.replace('data-iqxintarget="$blank$"', "");
            }
            ;
            a = a.replace("$name$", elist[i].name).replace("$favicon$", escapeAttr(iconData.src)).replace("$iconSourceAttr$", getIconSourceAttr(iconData));
            innerHTML += a;
          }
          innerHTML += '<span class="iqxin-additem iqxin-set-active">+</span></div>';
          odiv.innerHTML = innerHTML;
          this.addItemBoxRemove("#importingBox");
          var btnEle = this.$("#btnEle");
          btnEle.parentNode.insertBefore(odiv, btnEle);
        },
        // “设置按钮” 透明度
        setBtnOpacityFun: function() {
          if (~window.navigator.userAgent.indexOf("Chrome")) {
            var odom = this.$("#setBtnOpacityRange");
            var odomV = odom.value;
            console.log(odomV, getSettingData.setBtnOpacity);
            if (getSettingData.setBtnOpacity < 0) {
              this.$(".iqxin-setBtnOpacityRangeValue").innerHTML = odomV.toString().padEnd(4, "0");
              odom.style.background = "-webkit-linear-gradient(left,#3ABDC1,#83e7ea) no-repeat, var(--range-track-bg-qxin, #fff)";
            } else {
              this.$(".iqxin-setBtnOpacityRangeValue").innerHTML = "禁用";
              odom.style.background = "-webkit-linear-gradient(left,#bdbdbd,#c6c7c7) no-repeat, var(--range-track-bg-qxin, #fff)";
            }
            odom.style.backgroundSize = odom.value * 100 + "% 100%";
            getSettingData.setBtnOpacity = -getSettingData.setBtnOpacity;
          } else {
            iqxinShowTip("抱歉,目前只支持chrome类浏览器", 2500);
          }
        },
        // 标题点击 （开关搜索列表）（可以并入到下面的点击事件）
        titleClick: function(e) {
          var target = e.target;
          target.dataset.xin = -parseInt(target.dataset.xin);
          target.dataset.xin > 0 ? iqxinShowTip("启用") : iqxinShowTip("禁用");
        },
        // 点击事件   此处的 if 需要根据实际情况替换成 elseif (switch)
        domClick: function(e) {
          var targetClass = e.target.className;
          var targetid = e.target.id;
          debug("点击事件：%o, ID: %o, class: %o, e: %o", e.target, targetid, targetClass, e);
          if (~e.target.className.indexOf("iqxin-set-del")) {
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
          }
          ;
          if (~e.target.className.indexOf("iqxin-set-title-del")) {
            e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
          }
          ;
          if (~e.target.className.indexOf("iqxin-additem")) {
            this.parentNode = e.target.parentNode;
            this.addItemBox();
          }
          ;
          if (e.target.className === "sej-engine") {
            e.target.dataset.iqxindisabled = e.target.dataset.iqxindisabled ? "" : "true";
            e.target.dataset.iqxindisabled ? iqxinShowTip("禁用") : iqxinShowTip("启用");
          }
          ;
          if (~targetClass.indexOf("addItemBoxCancel")) {
            this.addItemBoxRemove();
          }
          ;
          if (~targetClass.indexOf("addItemBoxEnter")) {
            this.addItemEnger();
          }
          ;
          if (targetid === "nSearchList") {
            debug("添加新的搜索列表");
            this.addSearchListBox();
          }
          ;
          if (targetid === "addSearchListBoxEnter") {
            debug("向网页添加元素");
            this.addSearchListEnger();
          }
          ;
          if (targetid === "addSearchListBoxCancel") {
            debug("移除盒子");
            this.addItemBoxRemove("#newSearchListBox");
          }
          ;
          if (~targetClass.indexOf("editItemBoxEnter")) {
            this.addEditBoxEnger();
          }
          ;
          if (~e.target.className.indexOf("iqxin-set-edit")) {
            this.addEditBox(e);
          }
          if (~targetClass.indexOf("iqxin-title-edit")) {
            e.stopPropagation();
            this.addTitleEditBox(e);
          }
          if (~targetClass.indexOf("sejtitle")) {
            this.titleClick(e);
          }
          if (targetid === "codeboxclose") {
            this.editCodeBoxClose();
          } else if (targetid === "xin-reset") {
            this.reset();
          } else if (targetid === "xin-codeboxsave") {
            this.editCodeBoxSave();
          } else if (targetid === "xin-copyCode") {
            GM_setClipboard(JSON.stringify(getSettingData, false, 4));
            iqxinShowTip("复制成功");
          }
          if (targetid === "moreSet") {
            var morePanel = this.$("#btnEle2");
            morePanel.classList.toggle("btnEle2active");
            e.target.classList.toggle("iqxin-btn-active", morePanel.classList.contains("btnEle2active"));
            this.windowResize();
          }
          if (targetid === "xin-importing") {
            this.addImportingBox();
          }
          if (targetClass === "xin-importing-item") {
            this.addImportingEnger(e);
          }
          if (targetClass === "iqxin-setBtnOpacityRangeValue") {
            this.setBtnOpacityFun();
          }
          if (targetid === "xin-close") {
            this.hide();
          }
          if (~targetClass.indexOf("iqxin-items") || targetid === "settingLayer" || targetClass === "btnEleLayer") {
            this.allBoxClose();
          }
        },
        // 关闭所有次级窗口、菜单
        allBoxClose: function() {
          this.addItemBoxRemove();
          this.addDelremove();
          this.editCodeBoxClose();
          this.addTitleEditBoxRemove();
          this.addItemBoxRemove("#newSearchListBox");
          this.boxClose("#iqxin-sortBox");
          this.addItemBoxRemove("#importingBox");
          this.$("#btnEle2").classList.remove("btnEle2active");
          this.$("#moreSet").classList.remove("iqxin-btn-active");
        },
        // 窗口位置拖动
        setDragNode: function(ele) {
          var node = this.$("#dragDom");
          node.addEventListener("mousedown", function(event) {
            ele.style.transition = "null";
            var disX = event.clientX - ele.offsetLeft;
            var disY = event.clientY - ele.offsetTop;
            var move = function(event2) {
              ele.style.left = event2.clientX - disX + "px";
              ele.style.top = event2.clientY - disY + "px";
            };
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", function() {
              ele.style.transition = "0.5s";
              document.removeEventListener("mousemove", move);
            });
          });
        },
        // 拖动
        domdragstart: function(e) {
          if (~this.className.indexOf("sejtitle")) {
            dragEl = this.parentNode;
          } else {
            dragEl = this;
          }
          dragData = dragEl.innerHTML;
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("text/html", dragEl.innerHTML);
        },
        domdragenter: function(e) {
          var target = e.target;
          var targetClass = target.className;
          if (~targetClass.indexOf("sejtitle")) {
            target = target.parentNode;
          }
          target.classList.add("drop-over");
        },
        domdragover: function(e) {
          if (e.preventDefault) {
            e.preventDefault();
          }
          e.dataTransfer.dropEffect = "move";
          return false;
        },
        domdragleave: function(e) {
          var target = e.target;
          var targetClass = target.className;
          if (~targetClass.indexOf("sejtitle")) {
            target = target.parentNode;
          }
          target.classList.remove("drop-over");
        },
        domdrop: function(e) {
          debug("拖拽结束");
          var _this = e.target;
          var that = _this.parentNode;
          var pparentNode = that.parentNode;
          this.domdropend();
          if (dragEl.className != that.className) {
            console.log("移动对象 之前,现在: ", dragEl.className);
            console.log(that.className);
            return;
          }
          var targetRect = _this.getBoundingClientRect();
          var width = targetRect.right - targetRect.left;
          var height = targetRect.bottom - targetRect.top;
          var domPosition = null;
          if (~_this.className.indexOf("sejtitle")) {
            debug(e.clientX, targetRect.left, height, e.clientX - targetRect.left, (e.clientX - targetRect.left) / height);
            if ((e.clientX - targetRect.left) / width > 0.5) {
              debug("右");
              domPosition = true;
            } else {
              debug("左");
              domPosition = false;
            }
          } else {
            if ((e.clientY - targetRect.top) / height > 0.5) {
              debug("下");
              domPosition = true;
            } else {
              debug("上");
              domPosition = false;
            }
          }
          dragEl.style.transformOrigin = "top center";
          dragEl.style.animation = "sejopen 0.3s";
          if (domPosition) {
            if (pparentNode.lastChild == that) {
              pparentNode.insertBefore(dragEl, that);
            } else {
              pparentNode.insertBefore(dragEl, that.nextElementSibling);
            }
          } else {
            that.parentNode.insertBefore(dragEl, that);
          }
          this.dragEvent();
          return false;
        },
        domdropend: function() {
          var dom = this.$(".drop-over");
          if (dom) {
            dom.classList.remove("drop-over");
          }
        },
        // 判断是否能连接至google
        isOnline: function() {
          console.log("this.online", this.online);
          if (this.online) return;
          var that = this;
          GM_xmlhttpRequest({
            method: "GET",
            url: "https://www.google.com/s2/favicons?domain=www.baidu.com&" + Math.random(),
            responseType: "arraybuffer",
            timeout: 2e3,
            onload: function(response) {
              that.online = response.status >= 200 && response.status < 400 && !!response.response;
            },
            onerror: function() {
              that.online = false;
            },
            ontimeout: function() {
              that.online = false;
            },
            onabort: function() {
              that.online = false;
            }
          });
        },
        // 重新加载工具
        reloadSet: function() {
          this.destroy();
          var elems = document.querySelectorAll("#sej-container, #sej-setting-host, #settingLayerMask, sejspan.sej-drop-list");
          if (!elems) return;
          console.log("elems: " + elems);
          [].forEach.call(elems, function(elem) {
            elem.parentNode.removeChild(elem);
          });
          iqxinstart();
          iqxinShowTip("保存成功");
        },
        // 设置按钮透明度设置
        rangeChange: function(bool) {
          var odom = this.$("#setBtnOpacityRange");
          if (getSettingData.setBtnOpacity < 0) {
            odom.style.background = "-webkit-linear-gradient(left,#bdbdbd,#c6c7c7) no-repeat, var(--range-track-bg-qxin, #fff)";
            odom.style.backgroundSize = odom.value * 100 + "% 100%";
            this.$(".iqxin-setBtnOpacityRangeValue").innerHTML = "禁用";
            getSettingData.setBtnOpacity = -odom.value;
          } else {
            odom.style.background = "-webkit-linear-gradient(left,#3ABDC1,#83e7ea) no-repeat, var(--range-track-bg-qxin, #fff)";
            odom.style.backgroundSize = odom.value * 100 + "% 100%";
            let value = odom.value;
            let valueStr = "";
            if (value == 0) {
              valueStr = "0.00";
            } else if (value == 1) {
              valueStr = "1.00";
            } else {
              valueStr = odom.value.toString().padEnd(4, "0");
            }
            this.$(".iqxin-setBtnOpacityRangeValue").innerHTML = valueStr;
            getSettingData.setBtnOpacity = odom.value;
          }
        },
        // 窗口大小改变
        windowResize: function() {
          var eleStyle = window.getComputedStyle(this.ele, null);
          var w = parseInt(eleStyle.width);
          var h = parseInt(eleStyle.height);
          var ww = document.documentElement.clientWidth;
          var wh = document.documentElement.clientHeight;
          var maskStyle = this.mask.style;
          if (w >= ww) {
            maskStyle.justifyContent = "stretch";
          } else {
            maskStyle.justifyContent = "center";
          }
          if (h >= wh) {
            maskStyle.alignItems = "stretch";
          } else {
            maskStyle.alignItems = "center";
          }
        },
        saveData: function() {
          this.addTitleEditBoxRemove();
          var obj = {};
          var parentdiv = this.$$("#settingLayer .iqxin-items");
          for (let i = 0; i < parentdiv.length; i++) {
            var data2 = parentdiv[i].querySelectorAll(".sej-engine");
            var id = parentdiv[i].id;
            obj[id] = [];
            for (let ii = 0; ii < data2.length; ii++) {
              if (data2[ii].dataset.xin < 0) {
                var ij = -ii;
              } else {
                ij = ii;
              }
              obj[id][ij] = {};
              obj[id][ij].favicon = data2[ii].dataset.iqxinimg;
              obj[id][ij].name = data2[ii].dataset.iqxintitle;
              obj[id][ij].url = data2[ii].dataset.iqxinlink;
              if (data2[ii].dataset.iqxintarget) {
                obj[id][ij].blank = data2[ii].dataset.iqxintarget;
              }
              ;
              if (data2[ii].dataset.iqxindisabled) {
                obj[id][ij].disable = data2[ii].dataset.iqxindisabled;
              }
              ;
              if (data2[ii].dataset.iqxingbk) {
                obj[id][ij].gbk = data2[ii].dataset.iqxingbk;
              }
              ;
            }
          }
          var engineDetails2 = [];
          var odetails = this.$$(".sejtitle");
          var odetailsLength = odetails.length;
          for (let i = 0; i < odetailsLength; i++) {
            debug(odetails[i]);
            engineDetails2[i] = [];
            engineDetails2[i][0] = odetails[i].firstChild.innerHTML;
            engineDetails2[i][1] = odetails[i].dataset.iqxintitle;
            engineDetails2[i][2] = odetails[i].dataset.xin >= 0 ? true : false;
          }
          var onewtab = this.$("#iqxin-globalNewtab").selectedIndex;
          var foldlist = this.$("#iqxin-foldlist").checked;
          var getData = GM_getValue("searchEngineJumpData");
          getData.newtab = onewtab;
          getData.foldlist = foldlist;
          getData.setBtnOpacity = getSettingData.setBtnOpacity;
          getData.center = this.$("#iqxin-center").selectedIndex;
          getData.fixedTop = this.$("#iqxin-fixedTop").checked;
          getData.allOpen = this.$("#iqxin-allOpen-item").checked;
          getData.fixedTopUpward = this.$("#iqxin-fixedTopUpward-item").checked;
          getData.transtion = this.$("#iqxin-transtion").checked;
          getData.HideTheSameLink = this.$("#iqxin-HideTheSameLink").checked;
          getData.selectSearch = this.$("#iqxin-selectSearch").checked;
          getData.engineDetails = engineDetails2;
          getData.engineList = obj;
          debug("将要保存的数据：", getData);
          GM_setValue("searchEngineJumpData", getData);
        },
        // 此处的样式主要是设置界面
        addGlobalStyle: function() {
          var style;
          var css = `:host,:host([data-theme='light']){color-scheme:light;--font-color-qxin:#333;--background-avtive-color-qxin:#ccc;--background-active-enable-qxin:#cff9ff;--background-active-disable-qxin:#ffa2a2;--background-hover-color-qxin:#EAEAEA;--background-btn-qxin:#EFF4F8;--background-setting-qxin:#fff;--dialog-background-qxin:#1D1D1D;--dialog-font-color-qxin:#e8e8e8;--input-background-qxin:#fff;--input-focus-background-qxin:#f1d2d2;--input-color-qxin:#333;--input-border-qxin:#d9d9d9;--range-track-bg-qxin:#fff;--checkbox-background-qxin:#fff;--button-dialog-background-qxin:#fff;--button-dialog-color-qxin:#333;}:host([data-theme='dark']){color-scheme:dark;--font-color-qxin:#BDC1BC;--background-avtive-color-qxin:#424242;--background-active-enable-qxin:#274144;--background-active-disable-qxin:#583535;--background-hover-color-qxin:#424242;--background-btn-qxin:#292f36;--background-setting-qxin:#202124;--dialog-background-qxin:#1D1D1D;--dialog-font-color-qxin:#e8e8e8;--input-background-qxin:#292f36;--input-focus-background-qxin:#323f48;--input-color-qxin:#e8e8e8;--input-border-qxin:#4a545f;--range-track-bg-qxin:#31373f;--checkbox-background-qxin:#292f36;--button-dialog-background-qxin:#292f36;--button-dialog-color-qxin:#e8e8e8;}#settingLayerMask{display: none;position: fixed;top:0; right:0; bottom:0; left:0;color-scheme:inherit;background-color: rgba(0,0,0,.3);backdrop-filter: blur(10px);z-index: 200000000;overflow-x: hidden;overflow-y: auto;overscroll-behavior: contain;font-family: arial,sans-serif;width: 100vw;min-height: 100vh;font-size:16px;transition:0.3s;opacity:0;user-select: none;-moz-user-select: none;padding: 24px 20px 96px;box-sizing: border-box;color: var(--font-color-qxin, #333);}#settingLayerMask,#settingLayerMask *,#settingLayerMask *::before,#settingLayerMask *::after{box-sizing: border-box;}#settingLayerMask *{font-family: arial,sans-serif;letter-spacing: normal;}#settingLayerMask input,#settingLayerMask select,#settingLayerMask button,#settingLayerMask textarea{font:inherit;line-height:normal;letter-spacing:normal;text-transform:none;opacity:1;box-shadow:none;color:var(--input-color-qxin, #333);background-color:var(--input-background-qxin, #fff);border-color:var(--input-border-qxin, #d9d9d9);}#settingLayerMask #settingLayer{display: flex;flex-wrap: wrap;align-content:flex-start;align-items:flex-start;padding: 20px;margin: 0 auto;width: calc(100vw - 40px);max-width: calc(100vw - 40px);min-width: min(700px, calc(100vw - 40px));background-color: var(--background-setting-qxin, #fff);border-radius: 4px;position: relative;font-size:16px;line-height:1.5;color: var(--font-color-qxin, #333);transition:0.5s;}#settingLayerMask .iqxin-items{align-self:flex-start;min-width:5em;margin: 0 5px 0px;background:transparent;color:inherit;}#settingLayer .drag{display: block;position: relative;}#settingLayer .sej-engine{display: inline-block;width: 100%;box-sizing: border-box;}#settingLayerMask .iqxin-pointer-events,#settingLayerMask .sej-engine-icon,#settingLayer .sej-engine *{pointer-events:none;}#settingLayerMask .sejtitle{text-align: center;padding: 2px 0;cursor: pointer;position: relative;}#settingLayerMask [data-xin]{margin:4px 0;line-height:1.7;border-radius:4px;}#settingLayerMask .iqxin-set-edit,#settingLayerMask .iqxin-set-del{border-radius:4px;line-height: 1em;}#settingLayerMask .sejcon [data-xin]{cursor: pointer;}#settingLayerMask [data-iqxindisabled='true'],#settingLayerMask [data-xin^='-']{background-color: var(--background-avtive-color-qxin, #ccc);text-decoration: line-through;text-decoration-color:red;border-radius:2px;transition:.3s;}#settingLayerMask .sejtitle:not([data-xin^='-']):hover{background:var(--background-active-enable-qxin, #cff9ff);}#settingLayerMask .sej-engine:hover{background-color: var(--background-active-enable-qxin, #cff9ff);}#settingLayerMask [data-iqxindisabled='true']:hover,#settingLayerMask [data-xin^='-']:hover{background-color: var(--background-active-disable-qxin, #ffa2a2);}#settingLayerMask label{display:inline-flex;align-items:center;gap:5px;margin:0;padding:0;font:inherit;line-height:1.2;white-space:nowrap;cursor:pointer;}#settingLayerMask .sej-engine-icon{display:inline-block;width:16px;height:16px;max-width:16px;max-height:16px;border:none;padding:0;margin:0 3px 0 0;vertical-align:text-bottom;object-fit:contain;box-sizing:content-box;}#settingLayerMask .iqxin-set-edit .sej-engine-icon,#settingLayerMask .iqxin-set-del .sej-engine-icon,#settingLayerMask .iqxin-title-edit .sej-engine-icon,#settingLayerMask .iqxin-set-title-del .sej-engine-icon{margin:0;vertical-align:middle;}#settingLayerMask #btnEle2,#settingLayerMask #btnEle{position:static;flex:0 0 100%;width:100%;margin-top:8px;background: var(--background-setting-qxin, #fff);border-radius: 4px;}#settingLayerMask #btnEle{order:1000;}#settingLayerMask #btnEle2{order:1001;display:none;visibility:hidden;opacity:0;transform:none;transition : 0.3s;}#settingLayerMask #btnEle2.btnEle2active{display:block;visibility:visible;opacity:1;transform:none;}#settingLayerMask #btnEle2 span,#settingLayerMask #btnEle span{display: inline-flex;align-items:center;justify-content:center;background: var(--background-btn-qxin, #EFF4F8);border: 1px solid #3abdc1;margin: 8px 0;color: #3abdc1;padding: 5px 10px;min-height:42px;font-size:16px;font-weight:400;line-height:1.2;text-align:center;white-space:nowrap;vertical-align:middle;opacity:1;border-radius: 4px;cursor: pointer;outline: none;transition: 0.3s;}#settingLayerMask #btnEle a{color: #999;text-decoration: none;font-family: auto;}#settingLayerMask #btnEle a:hover{text-decoration: underline;color: #ef8957;}#settingLayerMask #btnEle2 span.feedback:hover,#settingLayerMask #btnEle span.feedback:hover{border-color:#ef8957;}#settingLayerMask #btnEle2 span:not(.feedback):hover,#settingLayerMask #btnEle span:not(.feedback):hover{background:#3ACBDD;color:#fff;}#settingLayerMask #btnEle .feedback{border-color: #aaa;}#settingLayerMask #btnEle2>div,#settingLayerMask #btnEle>div{width: 100%;display:flex;flex-wrap:wrap;align-items:center;justify-content: space-around;gap:8px 10px;min-height:58px;padding:0 10px;background: var(--background-setting-qxin, #fff);border-radius: 4px;}#settingLayerMask #moreSet.iqxin-btn-active,#settingLayerMask #moreSet.iqxin-btn-active:hover{background: var(--background-btn-qxin, #EFF4F8);color:red;border-color:red;}#settingLayerMask input[type=checkbox]{width: 12px;height: 12px;display: inline-block;flex:0 0 auto;text-align: center;vertical-align: middle;line-height: 10px!important;margin: 0 0 0 0!important;padding:0;appearance:none;-moz-appearance:none;-webkit-appearance:none;background:transparent;border:none;border-radius:0;opacity:1;position: relative;}#settingLayerMask input[type=checkbox]:before{content: '';position: absolute;top: 0;left: 0;background: var(--checkbox-background-qxin, #fff);width: 100%;height: 100%;border: 1px solid var(--input-border-qxin, #d9d9d9);box-sizing:border-box;}#settingLayerMask input[type=checkbox]:checked:after{content: "✔";display:flex;align-items:center;justify-content:center;background-color: #63d4d8;position: absolute;top: 0;left: 0;width: 12px;height: 12px;border: 1px solid #63d4d8;color: #fff;font-size: 10px;line-height:12px;box-sizing:border-box;}#settingLayerMask .drop-over{opacity: 0.6;}#settingLayerMask .iqxin-title-edit,#settingLayerMask .iqxin-set-edit,#settingLayerMask .iqxin-set-title-del,#settingLayerMask .iqxin-set-del {visibility: hidden;opacity:0;position: absolute;background: rgba(207, 249, 255, 0.86);color: red;top: 50%;transform: translate(0,-50%);right: 0;padding: 3px 3px 6px 6px;border-radius: 2px;cursor: pointer;transition: .3s;}#settingLayerMask .iqxin-set-title-del.iqxin-set-active {background: #fff;border-radius: 50% 0 0 50%;}#settingLayerMask .iqxin-title-edit{padding: 0px 3px 6px 6px;}#settingLayerMask span.iqxin-additem {display: inline-block;text-align: center;width: 100%;margin: 10px 0;border: 1px dotted red;color: red;cursor: pointer;visibility:hidden;opacity:0;transition:0.3s;transform:scale(0);}#settingLayerMask span.iqxin-additem.iqxin-set-active {visibility:visible;opacity:1;margin:10px 0;transform:scale(1);}#settingLayer .sejtitle:hover .iqxin-title-edit,#settingLayer .sejcon>span:hover .iqxin-set-edit{visibility:visible;opacity:0.8;}#settingLayerMask #nSearchList.iqxin-set-active,#settingLayerMask .iqxin-set-edit.iqxin-set-active,#settingLayerMask .iqxin-set-title-del.iqxin-set-active,#settingLayerMask .iqxin-set-del.iqxin-set-active {visibility:visible !important;opacity:1 !important;}#settingLayerMask #nSearchList{background:var(--background-btn-qxin, #EFF4F8) !important;}#settingLayerMask #btnEle span.iqxin-btn-active{color:red;border-color:red;}#settingLayerMask #newSearchListBox,#settingLayerMask #newSearchBox{transition:0.3s;transform : translateY(0%);opacity: 1;position:fixed;z-index:200000100;top:50%;left:50%;padding:22px;background:var(--dialog-background-qxin, #1D1D1D);border-radius:4px;color: var(--dialog-font-color-qxin, #e8e8e8);margin: -149px -117px;}#settingLayerMask #newSearchListBox input,#settingLayerMask #newSearchBox input{border: none;padding: 4px 0 4px 5px;border-radius: 4px;outline: none;background:var(--input-background-qxin, #fff);color:var(--input-color-qxin, #333);}#settingLayerMask #newSearchListBox input:focus,#settingLayerMask #newSearchBox input:focus {background: var(--input-focus-background-qxin, #f1d2d2);transition: 0.5s;}#settingLayerMask .addItemBoxBtn{cursor: pointer;background: var(--button-dialog-background-qxin, #fff);border: 1px solid var(--input-border-qxin, #d9d9d9);border-radius: 4px;padding: 4px 10px;color: var(--button-dialog-color-qxin, #333);transition:0.3s;}#settingLayerMask #xin-centerDisplay select,#settingLayerMask #xin-newtab select{height:auto;border: none;outline: none;color: #3ABDC1;font-size: 1em;font-family: arial,sans-serif;appearance: none;-moz-appearance: none;-webkit-appearance: none;padding: 0px 5px;cursor: pointer;text-decoration: underline;background: var(--background-btn-qxin, #EFF4F8);}#settingLayerMask #titleEdit{width:6em;}#settingLayerMask .iqxin-closeBtn,#settingLayerMask .iqxin-enterBtn{box-sizing: border-box;}#settingLayerMask .iqxin-closeBtn:hover{background: #ff6565;border-color: #ff6565;color: #fff;}#settingLayerMask .iqxin-enterBtn:hover{background: #84bb84;border-color: #84bb84;color: #fff;}#settingLayerMask #iqxin-editCodeBox button{cursor:pointer;background:var(--button-dialog-background-qxin, #fff);color:var(--button-dialog-color-qxin, #333);border:1px solid var(--input-border-qxin, #d9d9d9);}#settingLayerMask #iqxin-editCodeBox{background:var(--dialog-background-qxin, #1D1D1D) !important;color:var(--dialog-font-color-qxin, #e8e8e8);}#settingLayerMask #iqxin-editCodeBox textarea{background:var(--input-background-qxin, #fff);color:var(--input-color-qxin, #333);border:1px solid var(--input-border-qxin, #d9d9d9);}#settingLayerMask #xin-close{background:var(--background-btn-qxin, #fff);color:#3ABDC1;line-height:20px;text-align:center;height:20px;width:20px;text-align:center;font-size:20px;padding:10px;border: 3px solid #3ABDC1;border-radius: 50%;transition: .5s;top: -20px;right:-20px;position: absolute;box-sizing: unset;}#settingLayerMask #xin-close::before{content:'\\2716';margin:-10px;}#settingLayerMask #xin-close:hover{background: indianred;border-color: indianred;color: #fff;}#settingLayerMask #setBtnOpacityRange{outline: none;-webkit-appearance: none;appearance: none;width:190px;height:18px;margin:0 8px;padding:0;vertical-align:middle;opacity:1;background:-webkit-linear-gradient(left,#3ABDC1,#83e7ea) no-repeat, var(--range-track-bg-qxin, #fff);border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/}#settingLayerMask #setBtnOpacityRange::-webkit-slider-thumb{-webkit-appearance: none;} #settingLayerMask #setBtnOpacityRange::-webkit-slider-runnable-track{height: 10px;border-radius: 10px; /*将轨道设为圆角的*/box-shadow: 0 1px 1px #def3f8, inset 0 .125em .125em #0d1112; /*轨道内置阴影效果*/}#settingLayerMask #setBtnOpacityRange::-webkit-slider-thumb{-webkit-appearance: none;height: 18px;width: 18px;margin-top: -5px; /*使滑块超出轨道部分的偏移量相等*/background: var(--input-background-qxin, #fff); border-radius: 50%; /*外观设置为圆形*/border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/box-shadow: 0 .125em .125em #3b4547; /*添加底部阴影*/}#settingLayerMask #importingBox{position:fixed;width:350px;top:50%;left:50%;transform:translate(-50%,-50%);padding: 15px 30px;border-radius: 4px;background:var(--dialog-background-qxin, #1D1D1D);color:var(--dialog-font-color-qxin, #fff);}#settingLayerMask #importingBox li{margin:5px;border-bottom:1px solid #3ACBDD;}#settingLayerMask #importingBox li p{white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin-top:0;margin-bottom:0;}#settingLayerMask .xin-importing-item{cursor:pointer;}`;
          style = document.createElement("style");
          style.type = "text/css";
          style.textContent = css;
          this.root.appendChild(style);
          if (!getSettingData.transtion) {
            var noTransitionStyle = document.createElement("style");
            noTransitionStyle.type = "text/css";
            noTransitionStyle.textContent = "#settingLayerMask #settingLayer,#settingLayerMask #btnEle span,#settingLayerMask #btnEle2,#settingLayerMask .iqxin-set-del,#settingLayerMask span.iqxin-additem,#settingLayerMask #newSearchBox,#settingLayerMask .addItemBoxBtn,#settingLayerMask #xin-close,#settingLayerMask{transition:none;}#settingLayerMask{backdrop-filter:none;}";
            this.root.appendChild(noTransitionStyle);
          }
        }
      };
      if (getSettingData.setBtnOpacity >= 0) {
        var setBtn = document.createElement("span");
        setBtn.id = "setBtn";
        GM_addStyle("#setBtn{opacity:" + getSettingData.setBtnOpacity + ";display:inline-flex;align-items:center;justify-content:center;width:28px;min-width:28px;height:24px;line-height:1;vertical-align:middle;cursor:pointer;transition:0.5s;}#setBtn:hover,#setBtn:focus-visible,#setBtn:focus-within{opacity:1!important;}#setBtn img{display:block!important;width:16px!important;height:16px!important;margin:0!important;vertical-align:middle!important;pointer-events:none;}");
        setBtn.innerHTML = `<img style='margin:0 0 -3px 6px;width:16px;vertical-align: baseline;display:inline-block;cursor:pointer;' src="data:image/svg+xml,%3Csvg t='1666950165377' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='11048' width='32' height='32'%3E%3Cpath d='M337.333 517.667c77.406 0 141.974 54.967 156.8 127.998l440.534 0.002c17.673 0 32 14.327 32 32 0 17.496-14.042 31.713-31.471 31.995l-0.53 0.005-440.534 0.001C479.307 782.7 414.74 837.667 337.333 837.667S195.36 782.699 180.534 709.668l-99.2-0.001c-17.674 0-32-14.327-32-32 0-17.497 14.041-31.713 31.47-31.996l0.53-0.004 99.2-0.002c14.825-73.03 79.393-127.998 156.8-127.998z m0 64c-53.019 0-96 42.98-96 96 0 53.019 42.981 96 96 96 53.02 0 96-42.981 96-96 0-53.02-42.98-96-96-96z m341.334-405.334c77.406 0 141.974 54.968 156.799 127.999l99.2 0.001c17.674 0 32 14.327 32 32 0 17.497-14.041 31.713-31.47 31.996l-0.53 0.004-99.2 0.003c-14.826 73.03-79.394 127.997-156.8 127.997-77.405 0-141.973-54.967-156.798-127.997l-440.535-0.003c-17.673 0-32-14.327-32-32 0-17.496 14.042-31.713 31.471-31.995l0.53-0.005 440.534-0.001c14.825-73.031 79.393-127.999 156.799-127.999z m0 64c-53.02 0-96 42.981-96 96 0 53.02 42.98 96 96 96 53.019 0 96-42.98 96-96 0-53.019-42.981-96-96-96z' p-id='11049'%3E%3C/path%3E%3C/svg%3E">`;
        setBtn.setAttribute("tabindex", "0");
        setBtn.setAttribute("role", "button");
        setBtn.setAttribute("aria-label", "searchEngineJump 设置");
        document.querySelector("#sej-container").appendChild(setBtn);
        var sejSet = null;
        setBtn.addEventListener("click", setBtnStart);
      }
      ;
      GM_registerMenuCommand("search jump 搜索跳转设置", setBtnStart);
      function setBtnStart() {
        if (!sejSet || !document.querySelector("#sej-setting-host")) {
          sejSet = new SEJsetting();
          var sej_save = sejSet.$("#xin-save");
          var sej_addDel = sejSet.$("#xin-addDel");
          var sej_edit = sejSet.$("#xin-modification");
          sej_save.addEventListener("click", function() {
            sejSet.saveData();
            sejSet.hide();
            sejSet.reloadSet();
          });
          sej_addDel.addEventListener("click", function(e) {
            sejSet.addDel(e);
          });
          sej_edit.addEventListener("click", function() {
            sejSet.editCodeBox();
          });
          window.addEventListener("resize", sejSet.windowResize.bind(sejSet));
        }
        sejSet.show();
      }
      function get_data() {
        setData = GM_getValue("searchEngineJumpData");
      }
      var setData = null;
    }
    var debug;
    function reloadDebug(bool) {
      debug = bool ? console.info.bind(console) : function() {
      };
    }
    if (window.self != window.top) return;
    var url = window.location.href;
    var delayList = [
      /^https?:\/\/google\.infinitynewtab\.com\/\?q/,
      /^https?:\/\/www\.zhihu\.com\/search\?/,
      /^https?:\/\/www\.iciba\.com\/word\?/,
      /^https?:\/\/neeva\.com\/search\?/i,
      /^https?:\/\/s\.taobao\.com\/search/
    ];
    var delayListTag = delayList.some(function hashUrl(element, index, array) {
      return ~url.search(element);
    });
    if (delayListTag) {
      setTimeout(function() {
        var sejSpan = document.querySelector("sejspan");
        if (sejSpan) {
          return;
        } else {
          iqxinstart();
        }
      }, 2e3);
    } else {
      iqxinstart();
    }
    if (true) {
      setTimeout(function() {
        var watch = document.querySelector("title");
        new (window.MutationObserver || window.WebKitMutationObserver)(function(mutations) {
          console.log("iqxin标题发生了变化", document.title);
          var sejSpan = document.querySelector("sejspan");
          if (!sejSpan) {
            iqxinstart();
          } else {
            sejSpan.parentNode.removeChild(sejSpan);
            iqxinstart();
          }
        }).observe(watch, { childList: true, subtree: true, characterData: true });
      }, 1e3);
    }
  })();
})();
