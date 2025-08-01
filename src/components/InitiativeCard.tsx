import { Globe, FileText, Github } from 'lucide-react';
import { Initiative } from '../data';

// Get flag emoji for a country
const getCountryFlagEmoji = (country: string): string => {
    const flagMap: Record<string, string> = {
        'Spain': '🇪🇸',
        'Portugal': '🇵🇹',
        'Netherlands': '🇳🇱',
        'Greece': '🇬🇷',
        'UAE': '🇦🇪',
        'France': '🇫🇷',
        'Brazil': '🇧🇷',
        'Singapore': '🇸🇬',
        'India': '🇮🇳',
        'Canada': '🇨🇦'
    };
    return flagMap[country] || '🏳️';
};

// Clean country name from initiative title
const removeCountryFromTitle = (name: string, country: string): string => {
    const regex = new RegExp(`^${country}\\s+`, 'i');
    let cleanedName = name.replace(regex, '');

    const endRegex = new RegExp(`\\s+of\\s+${country}`, 'i');
    cleanedName = cleanedName.replace(endRegex, '');

    const adjectiveMap: Record<string, string[]> = {
        'France': ['French'],
        'Canada': ['Canadian'],
        'Netherlands': ['Dutch'],
        'Greece': ['Greek', 'Hellenic'],
        'UAE': ['Emirati'],
        'Brazil': ['Brazilian'],
        'Singapore': ['Singaporean'],
        'India': ['Indian']
    };

    if (adjectiveMap[country]) {
        for (const adjective of adjectiveMap[country]) {
            const adjRegex = new RegExp(`^${adjective}\\s+`, 'i');
            cleanedName = cleanedName.replace(adjRegex, '');
        }
    }

    return cleanedName;
};

// Funding source tag component
const FundingSourceTag = ({ organization }: { organization: string }) => {
    const isGovernmentFunded =
        organization.toLowerCase().includes('government') ||
        organization.toLowerCase().includes('university') ||
        organization.toLowerCase().includes('research') ||
        organization.toLowerCase().includes('iit') ||
        organization.toLowerCase().includes('innovation, science and economic') ||
        organization.toLowerCase().includes('tno') ||
        organization.toLowerCase().includes('fapesp');

    const fundingSource = isGovernmentFunded ? 'Government-funded' : 'Commercial';

    const colorMap: Record<string, string> = {
        'Government-funded': 'bg-blue-100 dark:bg-blue-900/70 text-blue-700 dark:text-blue-200 border border-blue-300 dark:border-blue-800',
        'Commercial': 'bg-purple-100 dark:bg-purple-900/70 text-purple-700 dark:text-purple-200 border border-purple-300 dark:border-purple-800'
    };

    return (
        <span className={`px-2 py-0.5 text-xs font-medium rounded ${colorMap[fundingSource]}`}>
            {fundingSource}
        </span>
    );
};

// Model Type tag component
const ModelTypeTag = ({ modelType }: { modelType: string }) => {
    const colorMap: Record<string, string> = {
        'LLM': 'bg-purple-100 dark:bg-purple-900/70 text-purple-700 dark:text-purple-200 border border-purple-300 dark:border-purple-800',
        'Infrastructure': 'bg-blue-100 dark:bg-blue-900/70 text-blue-700 dark:text-blue-200 border border-blue-300 dark:border-blue-800',
        'Research': 'bg-amber-100 dark:bg-amber-900/70 text-amber-700 dark:text-amber-200 border border-amber-300 dark:border-amber-800',
        'Dataset': 'bg-emerald-100 dark:bg-emerald-900/70 text-emerald-700 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800'
    };

    const tagClass = colorMap[modelType] || 'bg-gray-100 dark:bg-gray-900/70 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-800';

    return (
        <span className={`px-2 py-0.5 text-xs font-medium rounded ${tagClass}`}>
            {modelType}
        </span>
    );
};

interface InitiativeCardProps {
    initiative: Initiative;
}

export const InitiativeCard = ({ initiative }: InitiativeCardProps) => {
    const flagEmoji = getCountryFlagEmoji(initiative.country);

    const displayOrganization = initiative.name.includes("ALIA") && initiative.country === "Spain"
        ? "Government of Spain, Barcelona Supercomputing Center"
        : initiative.organization;

    return (
        <div className="group relative h-full flex flex-col initiative-card transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 via-blue-900/20 to-gray-900/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative flex-1 flex flex-col bg-white/90 dark:bg-gray-950 rounded-lg p-4 border border-gray-300/50 dark:border-gray-800/50 backdrop-blur-xl transition-all duration-300 group-hover:border-gray-400 dark:group-hover:border-gray-700 group-hover:bg-gray-50 dark:group-hover:bg-gray-900">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xl">{flagEmoji}</span>
                            <h3 className="text-lg font-medium tracking-tight text-gray-800 dark:text-white initiative-name font-sans">
                                {removeCountryFromTitle(initiative.name, initiative.country)}
                            </h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <ModelTypeTag modelType={initiative.modelType} />
                            <FundingSourceTag organization={displayOrganization} />
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-xs uppercase tracking-wider text-gray-500">
                            {initiative.region}
                        </span>
                        <span className="text-sm text-gray-400">
                            {initiative.country}
                        </span>
                    </div>
                </div>

                {/* Description */}
                <div className="flex-1 mb-2">
                    <p className="text-base leading-relaxed mb-3 line-clamp-6 group-hover:line-clamp-none text-gray-700 dark:text-gray-300 transition-colors">
                        {initiative.description}
                    </p>
                </div>

                {/* Organization */}
                <div className="text-base text-gray-400 mb-3">
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            <span className="text-gray-500">Organization:</span> {displayOrganization}
                        </div>
                    </div>
                </div>

                {/* Links */}
                <div className="flex-none mt-auto border-t pt-3 border-gray-300/50 dark:border-gray-800/50">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            {initiative.links.website && (
                                <a
                                    href={initiative.links.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center"
                                    title="Website"
                                >
                                    <Globe size={18} />
                                </a>
                            )}
                            {initiative.links.github && !initiative.links.github.includes('huggingface') && (
                                <a
                                    href={initiative.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center"
                                    title="GitHub"
                                >
                                    <Github size={18} />
                                </a>
                            )}
                            {initiative.links.github && initiative.links.github.includes('huggingface') && (
                                <a
                                    href={initiative.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center"
                                    title="HuggingFace"
                                >
                                    <span className="text-base">🤗</span>
                                </a>
                            )}
                            {initiative.links.paper && (
                                <a
                                    href={initiative.links.paper}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    title="Research Paper"
                                >
                                    <FileText size={16} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};