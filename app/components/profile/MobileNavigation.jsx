export default function MobileNavigation({
  isOpen,
  navigationItems,
  activeSection,
  setActiveSection,
  setIsMobileMenuOpen,
}) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden mb-6">
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="grid grid-cols-2 gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
