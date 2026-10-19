import React from 'react';
import { ActionMitigation } from '../types/agri';
import { CheckCircle2, Clock, AlertTriangle, ShieldCheck, UserCheck, Briefcase } from 'lucide-react';

interface ActionRecommendationsProps {
  mitigations: ActionMitigation[];
}

export const ActionRecommendations: React.FC<ActionRecommendationsProps> = ({ mitigations }) => {
  const getPriorityBadge = (priority: ActionMitigation['priority']) => {
    switch (priority) {
      case 'Immediate':
        return 'bg-rose-950/60 border-rose-700 text-rose-300';
      case 'Medium-term':
        return 'bg-amber-950/60 border-amber-700 text-amber-300';
      case 'Strategic':
      default:
        return 'bg-emerald-950/60 border-emerald-700 text-emerald-300';
    }
  };

  const getRoleIcon = (role: ActionMitigation['targetRole']) => {
    switch (role) {
      case 'Farmer / Grower':
        return <UserCheck className="w-3 h-3 text-emerald-400" />;
      case 'Grain Trader / Hedger':
        return <Briefcase className="w-3 h-3 text-sky-400" />;
      case 'Agri-Business / Supply Chain':
        return <ShieldCheck className="w-3 h-3 text-purple-400" />;
      case 'Policy / Co-op':
      default:
        return <CheckCircle2 className="w-3 h-3 text-teal-400" />;
    }
  };

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-lg p-3.5 mb-4">
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-stone-800">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-stone-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Tactical & Strategic Stakeholder Mitigations
          </h3>
          <p className="text-[11px] text-stone-400">
            Targeted operational interventions for growers, hedgers, and logistics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {mitigations.map((item) => {
          return (
            <div
              key={item.id}
              className="bg-stone-950/60 border border-stone-800 hover:border-stone-700 p-2.5 rounded-lg flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-300">
                    {getRoleIcon(item.targetRole)}
                    <span className="truncate">{item.targetRole.split('/')[0]}</span>
                  </div>

                  <span
                    className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${getPriorityBadge(
                      item.priority
                    )}`}
                  >
                    {item.priority}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-stone-100 leading-snug">
                  {item.action}
                </h4>

                <p className="text-[11px] text-stone-400 mt-1 leading-snug">
                  <span className="text-stone-300 font-medium">Context: </span>
                  {item.reason}
                </p>
              </div>

              <div className="mt-2 pt-1.5 border-t border-stone-800/80 flex items-center justify-between text-[10px] font-mono text-stone-500">
                <span>{item.category.replace('_', ' ').toUpperCase()}</span>
                <span className="text-emerald-400">Ready</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
