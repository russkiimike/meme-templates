"use client";
import {WebpackOverrideFn} from '@remotion/bundler';
 
export const webpackOverride: WebpackOverrideFn = (currentConfiguration) => {
  return {
    ...currentConfiguration,
    // Your override here
  };
};
