import React, { useState } from 'react';
import { FlaggedReport, NGOVerification } from '../../types';

interface AdminScreenProps {
  flaggedReports: FlaggedReport[];
  ngoVerifications: NGOVerification[];
  onDismissReport: (id: string) => void;
  onRemoveListing: (id: string) => void;
  onApproveNGO: (id: string, name: string) => void;
  onRequestNGOInfo: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const AdminScreen: React.FC<AdminScreenProps> = ({
  flaggedReports,
  ngoVerifications,
  onDismissReport,
  onRemoveListing,
  onApproveNGO,
  onRequestNGOInfo,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'flagged' | 'verification' | 'active'>('flagged');
  const [reDispatching, setReDispatching] = useState(false);

  const activeReports = flaggedReports.filter((r) => r.status === 'open');
  const pendingNGOs = ngoVerifications.filter((n) => n.status === 'awaiting');

  const handleExportLog = () => {
    onShowToast('📥 FSSAI Compliance & Audit log exported: TN_Food_Rescue_Audit_2026.csv downloaded.');
  };

  const handleContactDonor = (donorName: string) => {
    onShowToast(`✉️ In-app FSSAI compliance notice dispatched to ${donorName}.`);
  };

  const handleRedispatch = () => {
    setReDispatching(true);
    setTimeout(() => {
      setReDispatching(false);
      onShowToast('🚀 Nearest backup volunteer driver re-routed in Coimbatore.');
    }, 900);
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Header */}
      <div className="flex items-center justify-between py-space-sm mb-space-md">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs">
            <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              TN Food Safety &amp; FSSAI Admin
            </h1>
            <span className="px-space-xs py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm shadow-sm flex items-center gap-1 font-bold">
              <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                shield_person
              </span>
              STATE ADMIN
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 font-medium">
            Tamil Nadu Surplus Food Recovery &amp; Hygiene Compliance (IFSA)
          </p>
        </div>

        <button
          onClick={handleExportLog}
          className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors active:scale-95 shadow-xs"
          title="Export State Audit Log"
        >
          <span className="material-symbols-outlined text-[20px]">download</span>
        </button>
      </div>

      {/* System Vitals Card */}
      <div className="rounded-2xl bg-surface-container-low p-space-md shadow-sm mb-space-lg border border-surface-container">
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span className="font-label-md text-label-md text-on-surface font-bold">State Vitals • தமிழ்நாடு நெட்வொர்க்</span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">TNeGA Cloud Live</span>
        </div>

        <div className="flex items-center justify-between bg-surface-container rounded-xl p-2.5 text-on-surface-variant border border-surface-container-high">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              cloud_done
            </span>
            <span className="font-body-sm text-body-sm truncate font-medium">
              TN Dispatch Network: <strong className="text-on-surface font-bold">100% Operational</strong>
            </span>
          </div>
          <span className="inline-block w-1 h-1 rounded-full bg-outline-variant mx-1"></span>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="material-symbols-outlined text-[16px] text-tertiary">bolt</span>
            <span className="font-label-sm text-label-sm font-bold text-on-surface">FSSAI API Live</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-space-sm mb-space-lg">
        {/* Metric 1 */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col justify-between border border-surface-container">
          <div>
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">TN Registered Users</span>
              <span className="material-symbols-outlined text-[18px] text-primary">group</span>
            </div>
            <div className="font-headline-md text-headline-md text-on-surface font-bold">4,680</div>
          </div>
          <div className="mt-space-sm pt-2 bg-surface-container-low rounded-lg px-2 py-1">
            <p className="font-label-sm text-label-sm text-on-surface-variant truncate font-medium">
              <span className="text-primary font-bold">3,120</span> Mandapams •{' '}
              <span className="text-tertiary font-bold">1,560</span> NGOs
            </p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col justify-between border border-surface-container">
          <div>
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Donations Listed</span>
              <span className="material-symbols-outlined text-[18px] text-primary-container">inventory_2</span>
            </div>
            <div className="font-headline-md text-headline-md text-on-surface font-bold">12,490</div>
          </div>
          <div className="mt-space-sm pt-2 flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span className="font-label-sm text-label-sm font-bold">+28% this wedding season</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col justify-between border border-surface-container">
          <div>
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Completed Rescues</span>
              <span className="material-symbols-outlined text-[18px] text-primary">task_alt</span>
            </div>
            <div className="font-headline-md text-headline-md text-on-surface font-bold">11,920</div>
          </div>
          <div className="mt-space-sm flex items-center gap-2">
            <div className="flex-1 bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '95.4%' }}></div>
            </div>
            <span className="font-label-sm text-label-sm text-primary font-bold">95.4%</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-error-container/40 rounded-2xl p-space-md shadow-sm flex flex-col justify-between border border-error-container">
          <div>
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Safety Tickets</span>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-error"></span>
              </span>
            </div>
            <div className="font-headline-md text-headline-md text-error font-bold">{activeReports.length}</div>
          </div>
          <div className="mt-space-sm flex items-center gap-1 text-error">
            <span className="material-symbols-outlined text-[16px]">warning</span>
            <span className="font-label-sm text-label-sm font-bold">FSSAI Action Req.</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-surface-container p-1 rounded-2xl gap-1 mb-space-lg" role="tablist">
        <button
          onClick={() => setActiveTab('flagged')}
          className={`flex-1 py-2 px-1 rounded-xl font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'flagged'
              ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            flag
          </span>
          <span>Flagged</span>
          <span className="px-1.5 py-0.2 rounded-full bg-error text-on-error font-label-sm text-[10px] leading-tight font-bold">
            {activeReports.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`flex-1 py-2 px-1 rounded-xl font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'verification'
              ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">verified_user</span>
          <span>NGO Verify</span>
          <span className="px-1.5 py-0.2 rounded-full bg-surface-container-high text-on-surface font-label-sm text-[10px] leading-tight font-bold">
            {pendingNGOs.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-2 px-1 rounded-xl font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'active'
              ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">list_alt</span>
          <span>TN Feed</span>
        </button>
      </div>

      {/* Tab 1: Flagged Reports */}
      {activeTab === 'flagged' && (
        <div className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <span className="font-label-lg text-label-lg text-on-surface font-bold">
              Food Safety &amp; FSSAI Escalation Queue
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">SLA: Under 15m</span>
          </div>

          {activeReports.map((report) => (
            <div
              key={report.id}
              className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm relative overflow-hidden border border-surface-container"
            >
              <div
                className={`absolute top-0 left-0 w-1.5 h-full ${
                  report.riskType.includes('SAFETY') ? 'bg-error' : 'bg-tertiary'
                }`}
              ></div>

              <div className="flex items-start justify-between gap-space-sm pl-1 mb-space-sm">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm flex items-center gap-1 font-bold ${
                        report.riskType.includes('SAFETY')
                          ? 'bg-error-container text-on-error-container'
                          : 'bg-secondary-container text-on-secondary-fixed'
                      }`}
                    >
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full ${
                          report.riskType.includes('SAFETY') ? 'bg-error' : 'bg-tertiary'
                        }`}
                      ></span>
                      {report.riskType}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                      Ticket #{report.ticketId}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    {report.title}
                  </h3>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant shrink-0 font-medium">
                  {report.timeAgo}
                </span>
              </div>

              {report.imageUrl && (
                <div className="grid grid-cols-2 gap-space-sm pl-1 mb-space-md">
                  <div className="rounded-xl overflow-hidden h-28 relative shadow-sm">
                    <img src={report.imageUrl} alt={report.title} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 bg-inverse-surface/80 text-inverse-on-surface px-1.5 py-0.5 rounded font-label-sm text-[10px]">
                      {report.batchCode}
                    </span>
                  </div>
                  <div className="flex flex-col justify-between bg-surface-container-low rounded-xl p-2.5 border border-surface-container">
                    <div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant block mb-0.5 font-medium">
                        Reported By
                      </span>
                      <div className="flex items-center gap-1 text-on-surface font-bold font-body-sm text-body-sm">
                        <span className="material-symbols-outlined text-[16px] text-tertiary">foundation</span>
                        <span className="truncate">{report.reportedBy}</span>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 bg-surface-container rounded-lg p-1.5">
                      <span className="font-label-sm text-[11px] text-on-surface-variant block font-medium">Donor Establishment</span>
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-label-md text-on-surface truncate font-bold">
                          {report.donorName}
                        </span>
                        <span className="material-symbols-outlined text-[14px] text-outline">lock</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-surface-container-low rounded-xl p-space-sm pl-2.5 mb-space-md border border-surface-container">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-error text-[18px] shrink-0 mt-0.5">
                    report_problem
                  </span>
                  <div className="flex-1">
                    <span className="font-label-sm text-label-sm text-on-surface font-bold block">
                      Incident Summary:
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      {report.detail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Strip */}
              <div className="flex items-center gap-2 pt-1 pl-1">
                <button
                  onClick={() => onDismissReport(report.id)}
                  className="flex-1 h-10 px-2 rounded-xl bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md flex items-center justify-center gap-1 transition-colors font-bold"
                >
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  <span>Dismiss</span>
                </button>
                <button
                  onClick={() => handleContactDonor(report.donorName)}
                  className="flex-1 h-10 px-2 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md flex items-center justify-center gap-1 transition-colors font-bold"
                >
                  <span className="material-symbols-outlined text-[16px]">warning_amber</span>
                  <span>FSSAI Notice</span>
                </button>
                <button
                  onClick={() => onRemoveListing(report.id)}
                  className="h-10 px-3 rounded-xl bg-error text-on-error font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-transform font-bold"
                >
                  <span className="material-symbols-outlined text-[16px]">block</span>
                  <span>Delist</span>
                </button>
              </div>
            </div>
          ))}

          {activeReports.length === 0 && (
            <div className="p-8 text-center bg-surface-container-lowest rounded-2xl border border-surface-container">
              <span className="material-symbols-outlined text-4xl text-primary mb-2">verified</span>
              <h3 className="font-headline-sm text-on-surface font-bold">Queue Clear!</h3>
              <p className="font-body-sm text-on-surface-variant mt-1">
                Zero active FSSAI violations reported in Tamil Nadu today.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: NGO Accreditation */}
      {activeTab === 'verification' && (
        <div className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <span className="font-label-lg text-label-lg text-on-surface font-bold">
              Tamil Nadu NGO Verification Queue
            </span>
            <span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm rounded-full font-bold">
              {pendingNGOs.length} Awaiting
            </span>
          </div>

          {ngoVerifications.map((ngo) => (
            <div
              key={ngo.id}
              className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container"
            >
              <div className="flex items-center gap-space-sm mb-space-sm">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[28px]">corporate_fare</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-title-md text-title-md text-on-surface truncate font-bold">{ngo.name}</h4>
                    {ngo.status === 'approved' && (
                      <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                    )}
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate font-medium">
                    {ngo.location} • {ngo.registeredAgo}
                  </p>
                </div>
              </div>

              <div className="bg-surface-container-low rounded-xl p-3 space-y-2 mb-space-md border border-surface-container">
                <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
                  <span>Registration Status:</span>
                  <span className="font-bold text-on-surface">{ngo.taxStatus}</span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
                  <span>NITI Aayog Darpan ID:</span>
                  <span className="font-mono text-on-surface font-bold">{ngo.darpanId}</span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
                  <span>FSSAI Recovery Lic:</span>
                  <span className="font-mono text-on-surface font-bold text-[12px]">{ngo.fssaiReg}</span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
                  <span>Cold Storage &amp; Fleet:</span>
                  <span className="text-on-surface font-semibold">{ngo.storageCapacity}</span>
                </div>
              </div>

              <div className="bg-surface-container rounded-xl p-2.5 mb-space-md flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-error text-[22px] shrink-0">picture_as_pdf</span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-md text-label-md text-on-surface leading-tight truncate font-bold">
                      {ngo.documentName}
                    </span>
                    <span className="font-label-sm text-[11px] text-on-surface-variant">
                      {ngo.documentSize} • Verified Digital Hash
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onShowToast(`📄 Opening verified PDF: ${ngo.documentName}`)}
                  className="px-2.5 py-1 rounded-lg bg-surface-container-highest hover:bg-surface-variant text-on-surface font-label-sm text-label-sm flex items-center gap-1 font-bold shrink-0"
                >
                  <span className="material-symbols-outlined text-[14px]">visibility</span>
                  <span>View</span>
                </button>
              </div>

              {ngo.status === 'awaiting' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onRequestNGOInfo(ngo.id)}
                    className="flex-1 h-10 px-3 rounded-xl bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md flex items-center justify-center gap-1 transition-colors font-bold"
                  >
                    <span className="material-symbols-outlined text-[16px]">contact_support</span>
                    <span>Request Info</span>
                  </button>
                  <button
                    onClick={() => onApproveNGO(ngo.id, ngo.name)}
                    className="flex-1 h-10 px-3 rounded-xl bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-transform font-bold hover:bg-primary-container"
                  >
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>Approve NGO</span>
                  </button>
                </div>
              ) : (
                <div className="p-2 text-center rounded-xl bg-primary-fixed/30 text-primary font-label-md font-bold">
                  ✓ FSSAI IFSA Accredited
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Live Feed */}
      {activeTab === 'active' && (
        <div className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <span className="font-label-lg text-label-lg text-on-surface font-bold">Live Tamil Nadu Activity</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Auto-refresh: 10s</span>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex items-center gap-space-sm border border-surface-container">
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpVel4i3cPADyqL_hv1kuRyFChiMXWCeqZ0PKNR-_a1t4etmI-8jd7XcKTgvBodREep_3JbXbP7z6IX3QvQNPN06ZAen05Lvy0lBVndC67EppioTYjGOhQrPCSJgjeUMlg2d8lHlDiC1syOkFILbnINhUfxFQN1NHNz-EJKe5BQVQJdcPTXcm10cCI2WXPQBZM7_d8jYGOVOSCAfp3VYwdVfTs6WMddSbjHa3jkHgf-oF40nIXs5c"
                alt="Produce"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.2 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-[11px] font-bold">
                  PRODUCE
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">#TN-KOY-4819</span>
              </div>
              <h4 className="font-title-md text-title-md text-on-surface truncate font-bold">
                48 kg Keerai &amp; Country Brinjal
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate font-medium">
                Koyambedu Wholesale • Claimed by Anbalayam Shelter
              </p>
            </div>
            <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex items-center gap-space-sm border border-surface-container">
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP7s8PpAPrKiismX2SgnfBL9puNKj0nd9qP4aVlT_FO48U3r8ajsK3mKDAWNBjx7gMuHkBNW76sIifrpJ7OoH7Wpg7YFABjgNPoUgfC2crCs1stGBgsOU2iSIvL-Q5TBbHrAkbf9qwDZGaA-39MaT6jz2PdzAdlEs3gw32q9I6WI1B_-gOKa-SZ61x0dPRu2QoZhiBXYkAHD8jLorPZ8QrQ01_MU7nqWl1EL998cgr4e1JpkkCWsE"
                alt="Meals"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.2 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[11px] font-bold">
                  KALYANAM MEALS
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">#TN-MYL-4820</span>
              </div>
              <h4 className="font-title-md text-title-md text-on-surface truncate font-bold">
                85 Sambar Rice Boxes
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate font-medium">
                Sri Meenakshi Bhavan • Picked up by Tata Ace TN-07
              </p>
            </div>
            <span className="material-symbols-outlined text-tertiary text-[20px]">schedule</span>
          </div>
        </div>
      )}
    </div>
  );
};
