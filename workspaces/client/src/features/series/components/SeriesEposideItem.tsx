import Ellipsis from 'react-ellipsis-component';
import { Flipped } from 'react-flip-toolkit';
import { NavLink } from 'react-router';
import { Icon } from '@iconify/react';

import { Hoverable } from '@wsh-2025/client/src/features/layout/components/Hoverable';

interface Props {
  episode: {
    description: string;
    id: string;
    premium: boolean;
    thumbnailUrl: string;
    title: string;
  };
  selected: boolean;
}

export const SeriesEpisodeItem = ({ episode, selected }: Props) => {
  return (
    <Hoverable classNames={{ hovered: 'opacity-75' }}>
      <NavLink
        viewTransition
        className="block flex w-full flex-row items-start justify-between gap-x-[16px]"
        to={`/episodes/${episode.id}`}
      >
        {({ isTransitioning }) => {
          return (
            <>
              <Flipped stagger flipId={!selected && isTransitioning ? `episode-${episode.id}` : 0}>
                <div className="relative shrink-0 grow-0 overflow-hidden rounded-[8px] border-[2px] border-solid border-[#FFFFFF1F] before:absolute before:inset-x-0 before:bottom-0 before:block before:h-[64px] before:bg-gradient-to-t before:from-[#212121] before:to-transparent before:content-['']">
                  <img alt="" className="h-auto w-[192px]" src={episode.thumbnailUrl} loading="lazy" />
                  <Icon
                    icon="material-symbols:play-arrow-rounded"
                    className="absolute bottom-[4px] left-[4px] m-[4px] block size-[20px] text-[#ffffff]"
                  />
                  {episode.premium ? (
                    <span className="absolute right-[4px] bottom-[8px] inline-flex items-center justify-center rounded-[4px] bg-[#1c43d1] p-[4px] text-[10px] text-[#ffffff]">
                      プレミアム
                    </span>
                  ) : null}
                </div>
              </Flipped>

              <div className="shrink-1 grow-1">
                <div className="mb-[8px] text-[18px] font-bold text-[#ffffff]">
                  <Ellipsis ellipsis reflowOnResize maxLine={2} text={episode.title} visibleLine={2} />
                </div>
                <div className="text-[12px] text-[#999999]">
                  <Ellipsis ellipsis reflowOnResize maxLine={2} text={episode.description} visibleLine={2} />
                </div>
              </div>
            </>
          );
        }}
      </NavLink>
    </Hoverable>
  );
};
