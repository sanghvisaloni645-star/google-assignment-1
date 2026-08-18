import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CAMPAIGN_PRESETS } from '../data/addresses';
import {
  Activity,
  X,
  Radio,
  Send,
  Trash2,
  CheckCircle2,
  TrendingUp,
  Target,
  BarChart3,
  Copy,
  Check,
  Zap,
  Globe
} from 'lucide-react';

export const AnalyticsDebugPanel: React.FC = () => {
  const {
    isDebugOpen,
    setIsDebugOpen,
    utmParams,
    setUtmParams,
    ga4Events,
    clearGA4Events,
    navigateTo,
    orders,
    cart
  } = useStore();

  const [activeTab, setActiveTab] = useState<'events' | 'campaign' | 'benchmarks'>('events');
  const [copied, setCopied] = useState(false);

  if (!isDebugOpen) {
    return (
      <button
        onClick={() => setIsDebugOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 bg-stone-900/90 hover:bg-stone-950 text-stone-100 text-xs font-semibold px-3 py-2 rounded-full shadow-lg border border-stone-700 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
        title="Open GA4 & Campaign Attribution Debug Panel"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <Activity className="w-3.5 h-3.5 text-blue-400" />
        <span className="font-mono">GA4 Live ({ga4Events.length})</span>
      </button>
    );
  }

  const handlePresetSelect = (preset: (typeof CAMPAIGN_PRESETS)[0]) => {
    setUtmParams({
      utm_source: preset.source,
      utm_medium: preset.medium,
      utm_campaign: preset.campaign,
      utm_content: preset.content,
      utm_term: preset.term
    });
    navigateTo(preset.targetRoute as any);
  };

  const handleCopyParams = () => {
    const text = JSON.stringify(utmParams, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="analytics-debug-panel"
      className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-stone-950 text-stone-100 shadow-2xl border-l border-stone-800 flex flex-col animate-in slide-in-from-right duration-300 font-sans"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 border-b border-stone-800 bg-stone-900/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold text-stone-100 flex items-center gap-2">
              GA4 Attribution & Telemetry
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                ACTIVE
              </span>
            </h3>
            <p className="text-[11px] text-stone-400">West Coast Essentials Campaign Monitor</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsDebugOpen(false)}
          className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-800 bg-stone-900/40 text-xs font-mono">
        <button
          onClick={() => setActiveTab('events')}
          className={`flex-1 py-2.5 px-3 border-b-2 text-center transition-colors ${
            activeTab === 'events'
              ? 'border-blue-500 text-blue-400 font-bold bg-stone-900/60'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          Event Stream ({ga4Events.length})
        </button>
        <button
          onClick={() => setActiveTab('campaign')}
          className={`flex-1 py-2.5 px-3 border-b-2 text-center transition-colors ${
            activeTab === 'campaign'
              ? 'border-blue-500 text-blue-400 font-bold bg-stone-900/60'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          UTM Campaign
        </button>
        <button
          onClick={() => setActiveTab('benchmarks')}
          className={`flex-1 py-2.5 px-3 border-b-2 text-center transition-colors ${
            activeTab === 'benchmarks'
              ? 'border-blue-500 text-blue-400 font-bold bg-stone-900/60'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          KPI Targets
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs">
        {/* TAB 1: EVENT STREAM */}
        {activeTab === 'events' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-stone-400">
              <span className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                Live GA4 Dispatch Queue
              </span>
              <button
                onClick={clearGA4Events}
                className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3 h-3" /> Clear
              </button>
            </div>

            {ga4Events.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-stone-800 rounded-xl text-stone-500 space-y-2">
                <p>No events recorded yet in this session.</p>
                <p className="text-[10px]">Navigate products, click CTAs, or add to bag to trigger events.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {ga4Events.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-3 bg-stone-900/90 rounded-lg border border-stone-800 hover:border-stone-700 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {evt.eventName}
                      </span>
                      <span className="text-[10px] text-stone-500">{evt.timestamp}</span>
                    </div>

                    <div className="bg-stone-950 p-2 rounded text-[11px] text-stone-300 overflow-x-auto">
                      <pre>{JSON.stringify(evt.parameters, null, 2)}</pre>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CAMPAIGN ATTRIBUTION */}
        {activeTab === 'campaign' && (
          <div className="space-y-5">
            {/* Current Active UTM Box */}
            <div className="p-4 bg-stone-900 rounded-xl border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-200 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  Active Stored UTM Attribution
                </span>
                <button
                  onClick={handleCopyParams}
                  className="flex items-center gap-1 text-[10px] text-stone-400 hover:text-stone-200"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-500">utm_source</span>
                  <span className="text-emerald-400 font-bold">{utmParams.utm_source || 'direct'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-500">utm_medium</span>
                  <span className="text-stone-300">{utmParams.utm_medium || 'none'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-500">utm_campaign</span>
                  <span className="text-amber-400 font-bold">{utmParams.utm_campaign || 'none'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-500">utm_content</span>
                  <span className="text-stone-300">{utmParams.utm_content || '-'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">utm_term</span>
                  <span className="text-stone-300">{utmParams.utm_term || '-'}</span>
                </div>
              </div>
            </div>

            {/* Campaign Preset Simulator */}
            <div>
              <p className="text-stone-400 font-bold mb-2">Simulate Inbound Traffic Channel:</p>
              <div className="space-y-2">
                {CAMPAIGN_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handlePresetSelect(preset)}
                    className="w-full text-left p-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-blue-500 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-200 group-hover:text-blue-400">
                        {preset.name}
                      </span>
                      <span className="text-[10px] text-stone-500 font-mono">
                        {preset.targetRoute}
                      </span>
                    </div>
                    <p className="text-[10px] text-stone-400 mt-1">
                      src={preset.source} • med={preset.medium} • cmp={preset.campaign}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KPI BENCHMARKS */}
        {activeTab === 'benchmarks' && (
          <div className="space-y-4">
            <div className="p-3 bg-stone-900 rounded-xl border border-stone-800">
              <h4 className="font-bold text-stone-200 flex items-center gap-1.5 mb-1">
                <Target className="w-4 h-4 text-emerald-400" />
                PRD Redesign Benchmark Goals
              </h4>
              <p className="text-[11px] text-stone-400">
                Metrics targeting the 79% homepage exit & 30% checkout drop-off bottlenecks.
              </p>
            </div>

            <div className="space-y-2.5">
              {/* Metric 1 */}
              <div className="p-3 bg-stone-900/70 rounded-lg border border-stone-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-stone-300 font-medium">Session → Product View</span>
                  <span className="text-emerald-400 font-bold">Target: 45% (was 21%)</span>
                </div>
                <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[45%]" />
                </div>
                <span className="text-[10px] text-stone-500 mt-1 block">
                  Achieved via instant above-the-fold Trending Now grid & direct CTAs.
                </span>
              </div>

              {/* Metric 2 */}
              <div className="p-3 bg-stone-900/70 rounded-lg border border-stone-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-stone-300 font-medium">Shipping Step Drop-off</span>
                  <span className="text-emerald-400 font-bold">Target: &lt;12% (was 29.5%)</span>
                </div>
                <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[88%]" />
                </div>
                <span className="text-[10px] text-stone-500 mt-1 block">
                  Streamlined with simulated 1-click Address Autocomplete (CA & TX presets).
                </span>
              </div>

              {/* Metric 3 */}
              <div className="p-3 bg-stone-900/70 rounded-lg border border-stone-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-stone-300 font-medium">Payment Step Drop-off</span>
                  <span className="text-emerald-400 font-bold">Target: &lt;12% (was 29.8%)</span>
                </div>
                <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[88%]" />
                </div>
                <span className="text-[10px] text-stone-500 mt-1 block">
                  Promoted Apple Pay / Google Pay Express Checkout above manual card fields.
                </span>
              </div>

              {/* Metric 4 */}
              <div className="p-3 bg-stone-900/70 rounded-lg border border-stone-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-stone-300 font-medium">Add-to-cart → Purchase</span>
                  <span className="text-emerald-400 font-bold">Target: 40% (was 28.6%)</span>
                </div>
                <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[40%]" />
                </div>
                <span className="text-[10px] text-stone-500 mt-1 block">
                  Direct Quick Add modal + persistent bag drawer with free shipping tracker.
                </span>
              </div>

              {/* Metric 5 */}
              <div className="p-3 bg-stone-900/70 rounded-lg border border-stone-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-stone-300 font-medium">CA + TX Revenue Share</span>
                  <span className="text-emerald-400 font-bold">Target: &gt;50% (was 37.4%)</span>
                </div>
                <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full w-[55%]" />
                </div>
                <span className="text-[10px] text-stone-500 mt-1 block">
                  Fulfillment hub messaging + targeted West Coast Essentials collection drops.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-stone-900 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
        <span>GMS Prototype Telemetry v2.4</span>
        <button
          onClick={() => setIsDebugOpen(false)}
          className="text-stone-300 hover:text-white font-semibold"
        >
          Close Panel
        </button>
      </div>
    </div>
  );
};
