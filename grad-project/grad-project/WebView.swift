//
//  WebView.swift
//  grad-project
//
//  Created by Clara Popescu on 22/04/2026.
//

import SwiftUI
import WebKit
import UIKit

struct WebView: UIViewRepresentable {

    func makeUIView(context: Context) -> WKWebView {
        let webView = WKWebView()

        // Disable scrolling (optional)
        webView.scrollView.isScrollEnabled = false

        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        if let url = Bundle.main.url(forResource: "index", withExtension: "html") {
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        } else {
            print("❌ index.html not found")
        }
    }
}
